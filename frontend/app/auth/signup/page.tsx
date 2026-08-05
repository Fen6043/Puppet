'use client'
import {useRouter} from "next/navigation";
import {useState} from "react";

const SignupPage = () => {
    const router = useRouter();
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    async function signUp(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        const existingUserResponse = await fetch(`http://localhost:5000/usedb/checkUser?username=${encodeURIComponent(username)}`);
        const isValidUser = await existingUserResponse.json();
        console.log(isValidUser)
        if (!isValidUser) {
            alert("Username already exists. Please choose a different username.");
            return;
        }

        const response = await fetch("http://localhost:5000/usedb/addUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password })
        });

        if (response.ok) {
            alert("User registered successfully!");
            router.push("/auth/login");
        } else {
            const errorText = await response.text();
            console.error("Error registering user:", errorText);
            alert("Error registering user. Please try again.");
        }
    }

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="border-2 border-cyan-600 p-8 rounded-lg shadow-md flex flex-col items-center justify-center">
                <h1 className="text-2xl mb-4">Sign Up for <b className="text-cyan-600">Puppeter</b></h1>
                <form className="flex flex-col items-center justify-center">
                    <input className="m-2 border-2 border-cyan-600 p-2 rounded-lg" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input className="m-2 border-2 border-cyan-600 p-2 rounded-lg" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input className="m-2 border-2 border-cyan-600 p-2 rounded-lg" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg cursor-pointer" type="submit" onClick={(e)=>{signUp(e)}}>Sign Up</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage;