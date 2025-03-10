

import { useEffect, useState } from "react";
import User from "../models/User"
import { UserService } from "../services/userService";
import MessageCard from "../components/MessageCard";

function Profile() {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        UserService.getProfile()
            .then(setUser)
            .catch((err) => {
                setError(err instanceof Error ? err.message : "Error desconocido");
            })
            .finally(() => setLoading(false));
    }, []);




    return (

        <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 m-4 text-center">
            Perfil de Usuario
        </h2>
        { error && <p className="text-red-500">{error}</p> }
        
        
        {loading ? (
            <p>Cargando...</p>
        ) : (
            user && (

                <div>
                    <br />


                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <MessageCard type="joker" size="9xl">


                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">

                                    <tbody>
                                        <tr className="bg-gray-600 border-b border-gray-400">
                                            <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100">
                                                Name
                                            </th>
                                            <td className="px-6 py-4">
                                                {user?.name}
                                            </td>

                                        </tr>
                                        <tr className="bg-gray-600 border-b border-gray-400">
                                            <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100">
                                                Surname
                                            </th>
                                            <td className="px-6 py-4">
                                                {user?.surname}
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-600 border-b border-gray-400">
                                            <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100">
                                                Role
                                            </th>
                                            <td className="px-6 py-4">
                                                {user?.role}
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-600 border-b border-gray-400">
                                            <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100">
                                                Email
                                            </th>
                                            <td className="px-6 py-4">
                                                {user?.email}
                                            </td>
                                        </tr>
                                        <tr className="bg-gray-600 border-gray-40">
                                            <th scope="row" className="px-6 py-4 font-medium bg-gray-500 text-gray-50 whitespace-nowrap dark:text-gray-100">
                                                Role
                                            </th>
                                            <td className="px-6 py-4">
                                                {user?.role}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </MessageCard>

                    </div>


                </div>))}
        
        </>

        
    
    )
}

export default Profile
