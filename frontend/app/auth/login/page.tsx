'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";

const LoginPage = () => {
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function loginUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        const result = await fetch("http://localhost:5000/usedb/loginUser",{
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify({username,password}),
            credentials: "include"
        })

        const canLogin = await result.json()
        if(canLogin){
            router.push("/components/homepage")
        }
        else{
            alert("invalid username or password")
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="border-2 border-cyan-600 p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-4">Login to <b className="text-cyan-600">Puppeter</b></h1>
                <form className="flex flex-col items-center justify-center">
                    <input className="m-2 border-2 border-cyan-600 p-2 rounded-lg" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="m-2 border-2 border-cyan-600 p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer" type="submit" onClick={(e)=>{loginUser(e)}}>Login</button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;