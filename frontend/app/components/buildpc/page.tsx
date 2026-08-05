'use client'
import { usePartsContext } from "@/app/context/partsContext"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const BuildPC = () => {
    const {parts,setParts} = usePartsContext()
    const [loading,setLoading] = useState(true)
    const router = useRouter()

    useEffect(()=>{
        async function getBuild(){
            const response = await fetch("http://localhost:5000/usedb/getParts",{credentials:"include"})
            if(response.ok){
             const result = JSON.parse(await response.json())
             console.log(result,typeof result,Object.keys(result).length)
             if(typeof result === "object" && Object.keys(result).length > 0)
                 setParts(result)
            }
            setLoading(false)
        }
        getBuild()
    },[])

    const changeParts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParts({...parts,[e.target.name] : e.target.value})
    }

    async function saveBuild(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        console.log(parts)
        const response = await fetch("http://localhost:5000/usedb/addParts",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(parts),
            credentials: "include"
        })

        if(!response.ok)
        {
            alert("error while adding parts please try again later")
        }
        else{
            alert("Build saved successfully")
        }
    }

    function searchParts(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault()
        const name = e.currentTarget.name
        console.log(name)
        router.push(`/components/homepage?name=${parts[name]}`)
    }

    return(
        (loading)?
        <div>Loading...</div>
        :
        <div className="flex flex-col items-center">
        <table className="border-2 m-2 font-mono w-3/4">
            <thead className="border-2">
                <tr>
                    <th className="text-center p-2">Component</th>
                    <th className="text-center p-2">Part Name</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="text-center p-2">CPU</td>
                    <td className="text-center p-2"><input type="text" name="cpu" value={parts.cpu} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="cpu" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">GPU</td>
                    <td className="text-center p-2"><input type="text" name="gpu" value={parts.gpu} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="gpu" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">RAM</td>
                    <td className="text-center p-2"><input type="text" name="ram" value={parts.ram} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="ram" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">PSU</td>
                    <td className="text-center p-2"><input type="text" name="psu" value={parts.psu} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="psu" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Storage</td>
                    <td className="text-center p-2"><input type="text" name="storage" value={parts.storage} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="storage" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">CPU Cooler</td>
                    <td className="text-center p-2"><input type="text" name="cooler" value={parts.cooler} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="cooler" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Motherboard</td>
                    <td className="text-center p-2"><input type="text" name="motherboard" value={parts.motherboard} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="motherboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Cabinet</td>
                    <td className="text-center p-2"><input type="text" name="cabinet" value={parts.cabinet} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="cabinet" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Monitor</td>
                    <td className="text-center p-2"><input type="text" name="monitor" value={parts.monitor} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="monitor" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Keyboard</td>
                    <td className="text-center p-2"><input type="text" name="keyboard" value={parts.keyboard} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="keyboard" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Mouse</td>
                    <td className="text-center p-2"><input type="text" name="mouse" value={parts.mouse} onChange={(e)=>{changeParts(e)}} className="p-1 w-3/4 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                    <td><button name="mouse" className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-2 rounded-full cursor-pointer" onClick={(e)=>{searchParts(e)}}>^</button></td>
                </tr>
            </tbody>
        </table>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold ml-2 py-1 px-2 rounded cursor-pointer" onClick={(e)=>{saveBuild(e)}}>Save Build</button>
        </div>
    )
}

export default BuildPC