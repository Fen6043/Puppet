'use client'
import { usePartsContext } from "@/app/context/partsContext"

const BuildPC = () => {
    const {parts,setParts} = usePartsContext()

    const changeParts = (e: React.ChangeEvent<HTMLInputElement>) => {
        setParts({...parts,[e.target.name] : e.target.value})
    }

    return(
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
                    <td className="text-center p-2"><input type="text" name="cpu" value={parts.cpu} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">GPU</td>
                    <td className="text-center p-2"><input type="text" name="gpu" value={parts.gpu} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">RAM</td>
                    <td className="text-center p-2"><input type="text" name="ram" value={parts.ram} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">PSU</td>
                    <td className="text-center p-2"><input type="text" name="psu" value={parts.psu} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Storage</td>
                    <td className="text-center p-2"><input type="text" name="storage" value={parts.storage} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">CPU Cooler</td>
                    <td className="text-center p-2"><input type="text" name="cooler" value={parts.cooler} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Motherboard</td>
                    <td className="text-center p-2"><input type="text" name="motherboard" value={parts.motherboard} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Cabinet</td>
                    <td className="text-center p-2"><input type="text" name="cabinet" value={parts.cabinet} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Monitor</td>
                    <td className="text-center p-2"><input type="text" name="monitor" value={parts.monitor} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Keyboard</td>
                    <td className="text-center p-2"><input type="text" name="keyboard" value={parts.keyboard} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
                <tr>
                    <td className="text-center p-2">Mouse</td>
                    <td className="text-center p-2"><input type="text" name="mouse" value={parts.mouse} onChange={(e)=>{changeParts(e)}} className="p-1 focus:outline-none focus:ring-2 focus:ring-cyan-600" placeholder="type here..."/></td>
                </tr>
            </tbody>
        </table>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold ml-2 py-1 px-2 rounded cursor-pointer">Save Build</button>
        </div>
    )
}

export default BuildPC