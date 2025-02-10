import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = ()=>{
    const [user, setUser] = useState();
    const navigate = useNavigate()
    const onChangeUserForm = (field, value) => {
        setUser((prevUser) => ({
          ...prevUser,
          [field]: value,
        }));

        
      };
    const addUser = async () => {
        try {
          const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
    
          if (!response.ok) {
            throw new Error("Lỗi khi thêm user");
          }
    
          navigate("/")

        } catch (error) {
          console.error("Lỗi:", error);
        }
        console.log(user);
        
      };
    return(
        <form onSubmit={()=>addUser} className="w-full max-w-lg m-auto">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/2  mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
               Name
            </label>
            <input onChange={(e)=>onChangeUserForm("name",e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
              Role
            </label>
            <input onChange={(e)=>onChangeUserForm("role",e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6 ">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
              Image Link
            </label>
            <input onChange={(e)=>onChangeUserForm("img",e.target.value)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"/>
          </div>
        </div>
        <button type="button" onClick={()=>addUser()} className="px-[20px] py-[10px] rounded-xl text-white bg-blue-600">Add</button>
      </form>
    )
}
export default Add