"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] =React.useState(false);

    const onSignup = async () => {

        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-5xl font-semibold mb-6"> {loading ? "Processing" : "Signup"} </h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input 
                className="p-2 px-3 bg-white text-black rounded-lg mb-3"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />

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
            onClick={onSignup} className="p-1.5 px-3 border-2 rounded-full mb-3">{buttonDisabled ? "No signup": "Signup"}</button>
            <Link href="\login">Visit Login Page</Link>
        </div>
    )
}
