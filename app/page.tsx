"use client";

import { useEffect, useState } from "react";
const URL =
  process.env.BACKEND_URL ||
  "https://todo-git-main-codewithharry35434gmailcoms-projects.vercel.app";
export default function Home() {
  interface Document {
    _id: string;
    title: string;
    __v: number;
  }

  const [todo, setTodo] = useState<string>("");
  const [List, setList] = useState<Document[]>([]);
  const [Index, setIndexes] = useState<number>();
  const [Text, setText] = useState<string>("");
  const Add = async () => {
    const NewList = { title: todo };

    const SendTodo = await fetch(`${URL}/api/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewList),
    });

    const data = await SendTodo.json();
    setTodo("");
    setList([...List, data]);
  };
  const remove = async (index: number, id: string) => {
    try {
      const DeledData = await fetch(`${URL}/api/TodoDel`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const Del = await DeledData.json();

      const NewList = [...List];
      NewList.splice(index, 1);
      setList(NewList);
    } catch (error) {
      console.log(error);
    }
  };

  const Update = async (index: number, to: Document) => {
    console.log(to);
    try {
      const UpdateTodo = await fetch(`${URL}/api/todo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Data: to, title: Text }),
      });
      const res = await UpdateTodo.json();
      console.log(res);
      console.log(index, to);
      const NewList = [...List];

      NewList[index] = res.Data;
      setText("");

      setList(NewList);
      setIndexes(undefined);
    } catch (error) {
      console.log(error);
    }
  };
  //Fetch Data from DataBase
  useEffect(() => {
    async function Fetchdata() {
      const res = await fetch(`${URL}/api/TodoData`);
      const Data: Document[] = await res.json();
      setList(Data);
    }
    Fetchdata();
  }, []);

  return (
    <>
      <div className="block mb-2 text-sm font-medium text-center text-gray-900 dark:text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Add todo
      </div>
      <div className="mb-4 flex space-x-6">
        <input
          type="text"
          id="first_name"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter todo item"
          required
        />
        <button
          className="p-2 bg-red-500 hover:bg-red-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          onClick={Add}
        >
          Add
        </button>
      </div>
      <div className="text-center space-y-4 mx-auto w-full container items-center ">
        {List &&
          List.map((to, index: number) => (
            <main key={index} className="flex space-x-7 space-y-4">
              {Index !== index && (
                <div className="flex space-x-3 items-center">
                  <p>{to.title}</p>
                  <button
                    onClick={() => remove(index, to._id)}
                    className="bg-red-400 px-3 py-1 rounded-md text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setIndexes(index)}
                    className="bg-red-400 px-3 py-1 rounded-md text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Update
                  </button>
                </div>
              )}
              {Index === index && (
                <>
                  <input
                    placeholder={to.title}
                    onChange={(e) => setText(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                    onClick={() => Update(index, to)}
                    className="bg-red-400 px-3 py-1 rounded-md text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIndexes(undefined)}
                    className="bg-red-400 px-3 py-1 rounded-md text-white hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                </>
              )}
            </main>
          ))}
      </div>
    </>
  );
}
