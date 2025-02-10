import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [user, setUser] = useState({
    name: "",
    role: "",
    img: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL

  // Hàm cập nhật giá trị input
  const onChangeUserForm = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  // Hàm cập nhật user
  const updateUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: "PUT", // Cập nhật user
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error("Lỗi khi cập nhật user");
      }

      navigate("/"); // Quay về trang danh sách user
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  // Fetch thông tin user cần update khi component mount
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`);
        if (!response.ok) throw new Error("Lỗi khi lấy dữ liệu user");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Lỗi:", error);
      }
    };

    getUser();
  }, [id]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateUser();
      }}
      className="w-full max-w-lg m-auto"
    >
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Name
          </label>
          <input
            value={user.name}
            onChange={(e) => onChangeUserForm("name", e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            type="text"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Role
          </label>
          <input
            value={user.role}
            onChange={(e) => onChangeUserForm("role", e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            Image Link
          </label>
          <input
            value={user.img}
            onChange={(e) => onChangeUserForm("img", e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-[20px] py-[10px] rounded-xl text-white bg-blue-600"
      >
        Update User
      </button>
    </form>
  );
};

export default Update;
