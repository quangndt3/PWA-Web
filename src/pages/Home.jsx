import { useEffect, useState } from "react";
import Table from "../components/Table"

const Home = ()=>{
    const [users, setUsers] = useState([]);
    const deleteUser = async (id) => {
        try {
          await fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE",
          });
      
          // Cập nhật lại state sau khi xoá
          setUsers(users.filter((user) => user.id !== id));
        } catch (error) {
          console.error("Lỗi khi xoá user:", error);
        }
      };

      useEffect(() => {
        fetch("http://localhost:5000/users")
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          setUsers(data); // Không cần `.users` vì API trả về một mảng user
        })
          .catch(() => {
            // Khi offline, lấy dữ liệu từ cache
            caches.match("/data.json").then((cachedResponse) => {
              if (cachedResponse) {
                cachedResponse.json().then((data) => setUsers(data.user));
              } else {
                console.error("Không có dữ liệu cache!");
              }
            });
          });
      }, []);
      
    return(
        <Table users={users} deleteUser={deleteUser}></Table>
    )
}
export default Home
// json-server --watch E:/projects/PWA/my-react-app/public/data.json --port 5000