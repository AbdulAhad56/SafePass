import React from 'react';
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const copyText = (text) => {
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = passwordRef.current.type === "password" ? "text" : "password";
    ref.current.src = passwordRef.current.type === "password" ? "icons/eye.png" : "icons/eyecross.png";
  };

  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id })
      });

      const newEntry = { ...form, id: uuidv4() };
      setPasswordArray([...passwordArray, newEntry]);

      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry)
      });

      setform({ site: "", username: "", password: "" });

      toast('Password saved!', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    } else {
      toast('Error: Password not saved!', { theme: "light" });
    }
  };

  const deletePassword = async (id) => {
    if (confirm("Do you really want to delete this password?")) {
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    const selected = passwordArray.find(i => i.id === id);
    setform({ ...selected });
    setPasswordArray(passwordArray.filter(item => item.id !== id));
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-[#0f0f1b] text-white">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-600 opacity-20 blur-[100px]"></div>
      </div>

      <div className="p-3 md:container mx-auto min-h-[88vh]">
        <h1 className='text-4xl font-bold text-center text-white'>
          <span className='text-purple-400'>&lt;</span>
          Safe
          <span className='text-purple-400'>OP/&gt;</span>
        </h1>
        <p className='text-purple-300 text-lg text-center mb-8'>Your own Password Manager</p>

        <div className="flex flex-col p-4 gap-6 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder='Enter website URL'
            className='rounded-md bg-[#1f1f2e] text-white w-full max-w-2xl px-4 py-2 border border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none'
            type="text"
            name="site"
          />
          <div className="flex flex-col md:flex-row w-full max-w-2xl gap-4">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder='Enter Username'
              className='rounded-md bg-[#1f1f2e] text-white w-full px-4 py-2 border border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none'
              type="text"
              name="username"
            />
            <div className="relative w-full">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder='Enter Password'
                className='rounded-md bg-[#1f1f2e] text-white w-full px-4 py-2 border border-purple-500 focus:ring-2 focus:ring-purple-400 outline-none'
                type="password"
                name="password"
              />
              <span className='absolute right-3 top-2 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={24} src="icons/eye.png" alt="toggle" />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className='bg-purple-600 hover:bg-purple-500 transition-all px-6 py-2 rounded-md font-semibold shadow-md flex items-center gap-2'
          >
            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
            Save
          </button>
        </div>

        <div className="passwords mt-12">
          <h2 className='font-bold text-2xl mb-4 text-white'>Your Passwords</h2>
          {passwordArray.length === 0 ? (
            <p className="text-purple-400">No passwords to show.</p>
          ) : (
            <table className="table-auto w-full text-white border border-purple-800 rounded-md overflow-hidden">
              <thead className='bg-purple-700 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-[#1e1e2e]'>
                {passwordArray.map((item, index) => (
                  <tr key={index} className="border-t border-purple-800 text-center">
                    <td className='py-2 px-2'>
                      <div className="flex justify-center items-center gap-2">
                        <a href={item.site} target="_blank" rel="noreferrer" className="hover:underline">{item.site}</a>
                        <div className='cursor-pointer' onClick={() => copyText(item.site)}>
                          <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px"}}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 px-2'>
                      <div className="flex justify-center items-center gap-2">
                        <span>{item.username}</span>
                        <div className='cursor-pointer' onClick={() => copyText(item.username)}>
                          <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 px-2'>
                      <div className="flex justify-center items-center gap-2">
                        <span>{"*".repeat(item.password?.length || 0)}</span>
                        <div className='cursor-pointer' onClick={() => copyText(item.password)}>
                          <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 px-2'>
                      <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                        <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" colors="primary:#ffffff" style={{ width: "25px", height: "25px" }}></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
