import React from "react";

const Form = ({ setName, setDescription, setPriority, setDays, submit }) => {
  return (
    <div className="w-full space-x-12 mx-24 flex items-center">
      <div className="text-white text-2xl">Add Task : </div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        className="bg-[#121010] px-4 py-2 rounded-xl text-xl text-white"
      />
      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="bg-[#121010] px-4 py-2 rounded-xl text-xl text-white"
      />
      {/*  <input
        type="text"
        placeholder="Priority"
        onChange={(e) => setPriority(e.target.checked)}
        className="bg-[#121010] px-4 py-2 rounded-xl text-xl text-white"
      /> */}

      <select
        onChange={(e) => setPriority(e.target.value)}
        className="bg-[#121010] px-8 py-2 rounded-xl text-xl text-white"
      >
        <option value="Low Priority" defaultValue>
          Low Priority
        </option>
        <option value="Medium Priority">Medium Priority</option>
        <option value="High Priority">High Priority</option>
      </select>
      <input
        type="number"
        placeholder="Days"
        onChange={(e) => setDays(e.target.value)}
        className="bg-[#121010] px-4 py-2 rounded-xl text-xl text-white"
      />

      <button
        onClick={submit}
        className="bg-yellow-500 text-white px-8 py-3 rounded-xl text-xl"
      >
        Submit
      </button>
    </div>
  );
};

export default Form;
