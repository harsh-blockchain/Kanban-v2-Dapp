// SPDX-License-Identifier: MIT

pragma solidity >=0.3.0 <0.9.0;

contract kanban{

    struct task{
        uint256 id;
        string name;
        string description;
        string priority;
        uint timestamp;
        bool isCompleted;
        bool isExpired;
        address owner;
    }

    

    struct user{
        uint256 id;
        address userAddress;
    }


    mapping(address => task) userToTask;

    task[] public alltasks;

    mapping(uint256 => task) isToTask;

    user[] public allUsers;



    function checkUserRegistered() public view returns (bool){
        bool found = false;
        for (uint256 i = 0;i < allUsers.length; i++){
            if(allUsers[i].userAddress == msg.sender){

                found = true;

            }
        }
        return found;
    }



    modifier isUserRegistered(){
        require(checkUserRegistered(),"You are not Registered User");
        _;
    }

    modifier isOwner(address add){
        require(add == msg.sender,"You are not owner");
        _;
    }


    function getAllOnProgressTasks() isOwner(msg.sender) isUserRegistered external view returns (task[] memory){
        
        task[] memory temp = new task[](alltasks.length);
        uint256 counter = 0;

        

        for (uint256 i = 0; i < alltasks.length ; i++){
            if(alltasks[i].isCompleted == false && alltasks[i].isExpired == false && alltasks[i].owner == msg.sender){

                temp[counter] = alltasks[i]; 
                counter++;

            }
        }

        task[] memory result = new task[](counter);

        for(uint256 i = 0; i < counter; i++){
            result[i] = temp[i];
        }

        return result;
    } 

    function getAllCompletedTasks() isOwner(msg.sender) isUserRegistered public view returns (task[] memory){
        
        task[] memory temp = new task[](alltasks.length);
        uint256 counter = 0;


        

        for (uint256 i = 0; i < alltasks.length ; i++){
            if(alltasks[i].isCompleted == true && alltasks[i].owner == msg.sender){

                temp[counter] = alltasks[i]; 
                counter++;

            }
        }

        task[] memory result = new task[](counter);

        for(uint256 i = 0; i < counter; i++){
            result[i] = temp[i];
        }

        return result;
    } 


    function getAllExpiredTaks() isOwner(msg.sender) isUserRegistered public view returns (task[] memory){
        
        task[] memory temp = new task[](alltasks.length);
        uint256 counter = 0;

        

        for (uint256 i = 0; i < alltasks.length ; i++){
            if(alltasks[i].isExpired == true && alltasks[i].owner == msg.sender){

                temp[counter] = alltasks[i]; 
                counter++;

            }
        }

        task[] memory result = new task[](counter);

        for(uint256 i = 0; i < counter; i++){
            result[i] = temp[i];
        }

        return result;
    } 


    function completeTask(uint256 id) isOwner(msg.sender) isUserRegistered external{
        for (uint256 i = 0; i < alltasks.length; i++){
            if(alltasks[i].id == id){
                require(alltasks[i].isCompleted == false,"Task is already Completed");
                require(alltasks[i].isExpired == false,"Task is already Expired");

                alltasks[i].isCompleted = true;
                emit CompleteTask(id,alltasks[i].isCompleted);
            }
        }
    }

    event CompleteTask(uint id, bool isCompleted);

    

    function expireTask(uint256 id) isOwner(msg.sender) isUserRegistered external{
        for (uint256 i = 0; i < alltasks.length; i++){
            if(alltasks[i].id == id){
                require(alltasks[i].isCompleted == false,"Task is already Completed");
                require(alltasks[i].isExpired == false,"Task is already Expired");

                alltasks[i].isExpired = true;
                emit ExpireTask(id,alltasks[i].isExpired);
            }
        }

        
    }

    event ExpireTask(uint id, bool isExpired);


    function taskAlreadyPresent(string memory _name) private view returns(bool){
        bool found = false;
        for(uint i = 0; i < alltasks.length; i++){
            if(keccak256(abi.encodePacked(alltasks[i].name)) == keccak256(abi.encodePacked(_name))){
                found = true;
                break;
            }
        }
        return found;
    }

    

    

    function addTask(string memory _name,string memory _description,string memory _priority,uint _days) isUserRegistered external {
        require(taskAlreadyPresent(_name) == false,"Task Name already added!");
        uint256 _id = alltasks.length;
        uint _timestamp = block.timestamp + (_days * 1 days);


        


        alltasks.push(task(_id,_name,_description,_priority,_timestamp,false,false,msg.sender));

        userToTask[msg.sender] = task(_id,_name,_description,_priority,_timestamp,false,false,msg.sender);

        emit AddTask(_id,msg.sender);

    }

        event AddTask(uint256 id,address recipient);



    function registerUser() external{
        require(checkUserRegistered() == false,"You are Already registered");
        uint256 _id = allUsers.length;
        allUsers.push(user(_id,msg.sender));
        


        emit RegisterUsers(_id,msg.sender);
    }

    event RegisterUsers(uint256 id,address recipient);




}