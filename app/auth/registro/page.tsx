"use client";


import { useRouter } from "next/navigation";

import { useRef, useState } from "react";

function paginaderegistr (){

    const ref = useRef<any>();

    const router = useRouter();;

    const [userInfo, setUserInfo] = useState({
        nomeuser: '',
        email: '',
        password: '',
    });

    const [pending, setPending] = useState(false);
    const [error, setError] = useState("");

    async function handleChange (e:any)  {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }


    async function handleSubmit(e:any){
        e.preventDefault();

        if (!userInfo.nomeuser || !userInfo.email || !userInfo.password) {
            setError("Must provide all the Credentials!");
        }

        try {

            setPending(true);

            const res = await fetch("/api/auth/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userInfo)
            });

            if (res.ok) {
                setPending(false);
                ref?.current?.reset();
                router.push('/auth/login')
                console.log("User registration done");
            } else {
                const errorData = await res.json();
                setError(errorData.message);
                console.log('Something went wrong in else block');
                setPending(false);
            }

        } catch (error) {
            setPending(false);
            setError('Something went wrong');
        }

    }



    return (
        <div className="min-h-screen flex items-center justify-center">
            <form ref={ref} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="nomeuser"
                        type="text"
                        placeholder="Username"
                        name="nomeuser"
                        value={userInfo.nomeuser}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="********"
                        name="password"
                        value={userInfo.password}
                        required
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    {error && <span className="text-red-600 mx-2 px-2">{error}</span>}
                    <button
                        disabled={pending === true}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        {pending ? 'Registering' : 'Sign Up'}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default paginaderegistr