"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(()=>{
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-5xl font-semibold mb-6"> {loading ? "Processing" : "Login"} </h1>
            <hr />

            {/* email */}
            <label htmlFor="email">Email</label>
            <input 
                className="p-2 px-3 bg-white text-black rounded-lg mb-3"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />

            <label htmlFor="password">Password</label>
            <input 
                className="p-2 px-3 bg-white text-black rounded-lg mb-3"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />



            <button 
            onClick={onLogin} className="p-1.5 px-3 bg-white text-black rounded-full mb-3">Login here</button>
            <Link href="\signup">Visit Signup Page</Link>
        </div>
    )
}
