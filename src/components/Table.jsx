import { Link, useNavigate } from "react-router-dom"

const Table = ({ users, deleteUser }) => {
    const navigate = useNavigate();
    return (
        <div className="">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">

                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            User
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th
                                            className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            <Link to="/add">        <button className="px-[30px] py-[10px] rounded-xl text-white bg-green-600">Add</button></Link>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, index) => {
                                        return <>
                                            <tr key={index}>
                                                <td key={index} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-10 h-10">
                                                            <img className="w-full h-full rounded-full"
                                                                src={user.img}
                                                                alt="" />
                                                        </div>
                                                        <div className="ml-3">
                                                            <p className="text-gray-900 whitespace-no-wrap">
                                                                {user.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{user.role}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div
                                                        className="relative py-1 font-semibold text-green-900 leading-tight flex gap-[10px]">
                                                        <button onClick={() => navigate(`update/${user.id}`)} className="px-[20px] py-[10px] rounded-xl text-white bg-blue-500">Update</button>
                                                        <button onClick={() => deleteUser(user.id)} className="px-[20px] py-[10px] rounded-xl text-white bg-red-500">Delete</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        </>
                                    })}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Table