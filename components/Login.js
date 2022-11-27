import Image from "next/image";
import React from "react";
import Head from "next/head";
import logo from "./etherlogo.png";

const Login = ({ connectWallet }) => {
  return (
    <div className="h-screen w-screen flex bg-[#2d2d2d]">
      <div className=" items-center justify-center flex w-full flex-col gap-24">
        <Image
          src={logo}
          alt="logo"
          width={250}
          height={250}
          className="bg-[#686363] rounded-full py-8 px-8"
        />

        <div
          className="px-6 py-3 bg-white text-orange-600 text-2xl font-bold hover:scale-110 hover:ease-in-out transition-all hover:bg-slate-500 transform rounded-2xl duration-300 cursor-pointer"
          onClick={connectWallet}
        >
          Connect Wallet
        </div>
      </div>
    </div>
  );
};

export default Login;
