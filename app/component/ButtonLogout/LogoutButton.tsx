"use client";

import { signOut, useSession } from "next-auth/react";

export function LogoutButton(){
    const { data : session, status } = useSession()

    

    const handle = () =>
    {
        signOut()
        console.log("data: ",session, "status: ",status)
    }
    return (
        <button className="bg-red-600 mx-2 px-2 my-2 rounded-md text-white" onClick={handle}> terminar session </button>
    )
}
