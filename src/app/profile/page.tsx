"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {

    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <h1 className="text-3xl">Profile</h1>
            <h2 className="p-2 rounded bg-green-500">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >Logout</button>

            <button
            onClick={getUserDetails}
            className="bg-green-800 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >Get User Details</button>
        </div>
    )
}
