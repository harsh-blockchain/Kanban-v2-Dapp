import React, { useState, useEffect } from "react";
import Head from "next/head";
import { ethers } from "ethers";
import { KanbanAddress, KanbanABI } from "../config";
import Login from "../components/Login";
import ListBoard from "../components/ListBoard";
import { StarIcon } from "@heroicons/react/outline";
import Form from "../components/Form";
import { on } from "events";

const index = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(false);
  const [days, setDays] = useState(1);
  const [network, setNetwork] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [progressTasks, setProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [totalTasks, setTotalTasks] = useState([]);
  const [expiredTasks, setExpiredTasks] = useState([]);

  // set contract

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      setCurrentAccount(account);

      const network = await provider.getNetwork();
      setNetwork(network.name);

      ethereum.on("accountsChanged", (accounts) => {
        setCurrentAccount(accounts[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTasks = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);
      const progress = await contract.getAllOnProgressTasks();
      const completed = await contract.getAllCompletedTasks();
      const expired = await contract.getAllExpiredTaks();

      setProgressTasks(progress);
      setCompletedTasks(completed);
      setExpiredTasks(expired);
    } catch (error) {}
  };

  useEffect(() => {
    connectWallet();
    fetchTasks();
  });

  const createTask = async (e) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);
      const createTasks = await contract.addTask(
        name,
        description,
        priority,
        days
      );
      setLoading(true);
      await createTasks.wait();
      setLoading(false);
      fetchTasks();
    } catch (error) {}
  };

  const registerUser = async (e) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);
      const registerUser = await contract.registerUser();
      setLoading(true);
      await registerUser.wait();
      setLoading(false);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const completeTask = async (id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);
      const completeTask = await contract.completeTask(id);
      setLoading(true);
      await completeTask.wait();
      setLoading(false);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const expireTask = async (id) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(KanbanAddress, KanbanABI, signer);
      const expireTask = await contract.expireTask(id);
      setLoading(true);
      await expireTask.wait();
      setLoading(false);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  if (!currentAccount) {
    return <Login connectWallet={connectWallet} />;
  }

  return (
    <div className="bg-[#2d2d2d] w-auto h-auto flex">
      <Head>
        <title>Kanban Dapp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/*  */}

      <div className="flex flex-col mx-24 my-6">
        <div className="flex items-center justify-between">
          <div className="text-white font-extrabold p-10 text-4xl gap-10 flex items-center">
            <div>Kanban Board</div>
            <StarIcon className="h-8 text-slate-300 w-8" />
          </div>

          <div
            className="text-xl font-medium text-slate-500 bg-white px-6 py-3 rounded-full"
            onClick={registerUser}
          >
            Register User
          </div>

          <div className="text-xl font-medium text-white bg-slate-500 px-6 py-3 rounded-full">
            {currentAccount.slice(0, 8)}....
            {currentAccount.slice(-8, currentAccount.length)}
          </div>
        </div>

        <div className="my-10 mx-4">
          <Form
            setName={setName}
            setDescription={setDescription}
            setPriority={setPriority}
            setDays={setDays}
            submit={createTask}
          />
        </div>

        <div className="flex justify-evenly gap-24 w-11/12 mx-auto">
          <ListBoard
            title="In Progress"
            tasks={progressTasks}
            completeTask={completeTask}
            expireTask={expireTask}
          />
          <ListBoard
            title="Completed Tasks"
            tasks={completedTasks}
            expireTask={expireTask}
          />
          <ListBoard title="Expired Tasks" tasks={expiredTasks} />
        </div>
      </div>

      {/*  */}
    </div>
  );
};

export default index;
