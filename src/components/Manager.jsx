import React, { use } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useState, useEffect } from "react";
import { RiFileCopyFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const [eye, seteye] = useState(true);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  // const [IdofChangeEye, setIdofChangeEye] = useState(null)
  const [edit, setEditMode] = useState(false);
  const [details, setdetails] = useState({
    website: "",
    username: "",
    password: "",
  });
  const [passwordArray, setpasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let gotPasswords = await req.json();
    setpasswordArray(gotPasswords.data);
    console.log("gotPasswprds",gotPasswords)
  };

  useEffect(() => {
    // let allPasswordsFromLocalStorage = localStorage.getItem("passwords");
    getPasswords();
    console.log("GOt Passowrds")
  }, []);

  const savePassword = async () => {
    if(details.website.length<4 || details.password.length<4 || details.username.length<4){
             
      toast(`🦄 Minimum 4 Characters Required `, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return
    }
    let newArray;
    let newId;
    if (details.id) {
      newArray = passwordArray.map((item) => {
        if (item.id === details.id) {
          return details;
        }
        return item;
      });
      newId = details.id;
      await fetch("http://localhost:3000/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newId, ...details }),
      });
      console.log("Inside if")
    } else {
      console.log("Inside else")
      newId = uuidv4();
      console.log("Inside else")
      newArray = [...passwordArray, { ...details, id: newId }];
      console.log("Inside else")
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: newId, ...details }),
      });
    }
    console.log("Inside else")
    setpasswordArray(newArray);
    console.log(newArray);
    // localStorage.setItem("passwords", JSON.stringify(newArray));

    setdetails({ website: "", username: "", password: "" });

    toast(`🦄 Password ${details.id ? "Updated" : "Saved"}!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const editPassword = (itemId) => {
    setEditMode(!edit);
    console.log("Edit Clicked " + itemId);
    setdetails(passwordArray.find((item) => item.id === itemId));
    // localStorage.setItem("passwords", JSON.stringify(newArray));
  };

  const deletePassword = async (itemId, item) => {
    let reallyDelete = confirm(
      "Are you sure you want to delete this password?"
    );
    if (reallyDelete) {
      console.log("Delete Clicked " + itemId);
      let newArray = passwordArray.filter((item) => item.id !== itemId);
      setpasswordArray(newArray);
      // localStorage.setItem("passwords", JSON.stringify(newArray));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      toast("🦄 Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdetails({ ...details, [name]: value });
  };

  const copyText = (text) => {
    toast("🦄 Copied To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const toggleVisibility = (id) => {
    // console.log("Changed visibility for id", id);
    console.log(visiblePasswords)
    setVisiblePasswords((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // Toggle visibility for this specific row
    }));
    // setVisiblePasswords({...visiblePasswords, [id]: !visiblePasswords[id]});

  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="fixed top-0 z-[-2] min-h-screen max-sm:min-h-[200vh] w-screen min-w-2xs rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,rgb(255,255,255)_0,rgb(188,247,194)_100%)]"></div>
      <div className="text-center min-h-screen  py-8 xl:w-[50%] w-[80%] min-w-2xs mx-auto flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            <span className="text-green-600">&lt;</span>
            <span className="">Pass</span>
            <span className="text-green-600">Crypt/&gt;</span>
          </h1>
          <p className="text-sm font-semibold text-green-900">
            Your Password Manager...
          </p>
        </div>

        <input
          className="w-full font-medium border border-green-800 rounded-full px-4 py-1"
          type="text"
          placeholder="Enter website name"
          name="website"
          value={details.website}
          onChange={handleChange}
        />
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            className="sm:w-1/2 w-full border border-green-800 font-medium rounded-full px-4 py-1"
            type="text"
            placeholder="Enter Username"
            name="username"
            value={details.username}
            onChange={handleChange}
          />
          <div className="sm:w-1/2 w-full relative">
            <input
              className=" w-full border border-green-800 font-medium rounded-full px-4 py-1"
              type={eye ? "password" : "text"}
              placeholder="Enter Password"
              name="password"
              value={details.password}
              onChange={handleChange}
            />
            <span
              onClick={() => seteye(!eye)}
              className="eyeButton absolute right-4 top-2"
            >
              {eye ? (
                <HiEye className="text-xl" />
              ) : (
                <HiEyeOff className="text-xl" />
              )}
            </span>
          </div>
        </div>
        <button
          onClick={savePassword}
          className="AddPassword flex group gap-2 font-semibold hover:bg-black items-center bg-green-500 w-fit self-center px-4 py-1 border border-green-800 box-border rounded-full"
        >
          <lord-icon
            src="https://cdn.lordicon.com/jgnvfzqg.json"
            trigger="hover"
            className="w-6 group-hover:invert"
          ></lord-icon>
          <span className="group-hover:text-white"> Save Password</span>
        </button>

        <div className="relative overflow-x-auto  sm:rounded-lg flex flex-col gap-4">
          <h1 className="text-xl font-semibold flex self-start px-4">
            Your Passwords
          </h1>
          {!passwordArray.length ? (
            <div>Nothing</div>
          ) : (
            <table className="shadow-md overflow-hidden rounded-md w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm   text-white  bg-gray-900 ">
                <tr className="border border-white">
                  <th scope="col" className="px-6 py-3">
                    Website
                  </th>
                  <th scope="col" className="border border-white px-6 py-3">
                    Username
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Password
                  </th>
                  <th scope="col" className="px-6 py-3 border border-white ">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-black font-semibold text-[1rem]">
                {passwordArray.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="  bg-green-200 border border-white  "
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 gap-2 font-medium  whitespace-nowrap "
                      >
                        {item.website}{" "}
                        <RiFileCopyFill
                          className="text-xl"
                          onClick={() => {
                            copyText(item.website);
                          }}
                        />
                      </th>
                      <td scope="row" className="px-6 py-4 border border-white">
                        <div className="flex  items-center gap-2">
                          {item.username}
                          <RiFileCopyFill
                            className="text-xl"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          />
                        </div>
                      </td>

                      <td scope="row" className="px-6 py-4 border border-white">
                        <div className="flex items-center gap-2">
                          
                          {visiblePasswords[item.id]
                            ?<span className="text-[1rem]"> {item.password}</span>
                            :<span className="text-[1.4rem] font-bold"> { "*".repeat(item.password.length)}</span>}

                          {/* Step 4: Eye button to toggle visibility */}
                          <div
                            id={item.id}
                            onClick={() => {toggleVisibility(item.id)}} // Toggle visibility for this specific row
                          >
                            {visiblePasswords[item.id] ? (
                              <HiEyeOff className="text-xl" />
                            ) : (
                              <HiEye className="text-xl" />
                            )}
                          </div>
                          <RiFileCopyFill
                            className="text-xl"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          />
                        </div>
                      </td>
                      <td scope="row" className="px-6 py-4 border border-white">
                        <div className="flex items-center gap-2">
                          <FaEdit
                            onClick={() => {
                              editPassword(item.id, item);
                            }}
                            className="text-xl"
                          />
                          <lord-icon
                            onClick={() => {
                              deletePassword(item.id, item);
                            }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            colors="primary:#000000"
                            className="w-6"
                          ></lord-icon>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;

//1:50:00
