import React from "react";
import { PlusIcon } from "@heroicons/react/outline";

const ListBoard = ({ title, tasks, completeTask, expireTask }) => {
  const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
      date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
  };
  return (
    <div className="w-full flex flex-col bg-[#242121] py-5 px-9 rounded-3xl h-screen ">
      <div className="flex justify-between items-center">
        <div className="text-slate-300 font-bold text-2xl">{title}</div>
        <div className="p-4 bg-slate-700 rounded-2xl">
          <PlusIcon className="h-6 w-6 text-slate-300" />
        </div>
      </div>

      <div className="w-full h-full overflow-y-auto scrollbar-hide">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="bg-[#121010] my-8 p-5 rounded-2xl text-white space-y-4 w-full"
          >
            <div className="flex space-x-5 w-full">
              {!task.isExpired && (
                <div>
                  {!task.isCompleted ? (
                    <div
                      className="bg-green-300 text-green-700 px-4 py-2 rounded-full cursor-pointer hover:scale-90 ease-in-out hover:bg-green-500 hover:text-orange-500 transition-all duration-300 text-md items-center justify-center"
                      onClick={() => completeTask(task.id)}
                    >
                      Active
                    </div>
                  ) : (
                    <div className="bg-green-300 text-green-700 px-4 py-2 rounded-full cursor-pointer hover:scale-90 ease-in-out hover:bg-green-500 hover:text-orange-500 transition-all duration-300 text-md items-center justify-center">
                      Done
                    </div>
                  )}
                </div>
              )}

              {task.priority && (
                <div className="bg-green-300 text-green-700 px-4 py-2 rounded-full cursor-pointer hover:scale-90 ease-in-out hover:bg-green-500 hover:text-orange-500 transition-all duration-300 text-md items-center justify-center">
                  {task.priority}
                </div>
              )}

              {task.isExpired ? (
                <div className="bg-red-400 text-red-700 px-4 py-2 rounded-full cursor-pointer hover:scale-90 ease-in-out hover:bg-red-400 border-2 border-red-800 hover:text-red-800 transition-all duration-300 text-md items-center justify-center">
                  Expired
                </div>
              ) : (
                <div
                  className="bg-yellow-300 text-green-700 px-4 py-2 rounded-full cursor-pointer hover:scale-90 ease-in-out hover:bg-yellow-400 border-2 border-yellow-800 hover:text-green-800 transition-all duration-300 text-md items-center justify-center"
                  onClick={() => expireTask(task.id)}
                >
                  Expire
                </div>
              )}
            </div>
            <div className="text-xl font-semibold">{task.name}</div>
            <div className="text-md font-medium">{task.description}</div>

            <div>{timeConverter(task.timestamp.toNumber())}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListBoard;
