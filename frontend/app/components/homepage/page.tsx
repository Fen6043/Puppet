
'use client'
import { useState } from 'react'

const Homepage = () => {

  const [sclProducts, setSCLProducts] = useState<{ name: string; price: string }[]>([]);
  const [pcStudioProducts, setPCStudioProducts] = useState<{ name: string; price: string }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const combined = Array.from({ length: Math.max(sclProducts.length, pcStudioProducts.length) }, (_, index) => {
      return {
        scl: sclProducts[index] || { name: "", price: "" },
        pcStudio: pcStudioProducts[index] || { name: "", price: "" },
      };
    });

  async function fetchProducts() {
      try {
        console.log(searchQuery);
        setIsLoading(true);
        const data = await fetch(`http://localhost:5000/scrapeSCL?searchQ=${searchQuery}`).then(res => {
          setIsLoading(false);
          return res.json();
        });
        setSCLProducts(data);
        setPCStudioProducts([{ name: "test1", price: "0" }, { name: "test2", price: "10" }]);
        console.log("Fetched sclProducts:", data);
      } catch (error) {
        console.error("Error fetching sclProducts:", error);
      }
    }

  return (
    <div>
      <div className='m-2 flex items-center justify-center'>
        <input className='border-2 border-amber-50 py-1 px-4' onChange={(e) =>{setSearchQuery(e.target.value)}} type="text" placeholder="Search for Products..." />
        <button className='bg-amber-500 hover:bg-amber-600 text-white font-bold ml-2 py-1 px-2 rounded cursor-pointer' onClick={() => {fetchProducts()}}>Search</button>
        {isLoading && <h1 className='p-2 font-bold'>Loading...</h1>}
      </div>
      <div className='w-full'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='border-2 border-amber-50 p-2 text-emerald-500' colSpan={2}>SCL Gaming</th>
              <th className='border-2 border-amber-50 p-2 text-amber-500' colSpan={2}>PC Studio</th>
            </tr>
            <tr>
              <th className='border-2 border-amber-50 p-2'>Name</th>
              <th className='border-2 border-amber-50 p-2'>Price</th>
              <th className='border-2 border-amber-50 p-2'>Name</th>
              <th className='border-2 border-amber-50 p-2'>Price</th>
            </tr>
          </thead>
          <tbody>
            {combined.map((product, index) => (
              <tr key={index}>
                <td className='border-2 border-amber-50 text-center p-1'>{product.scl.name}</td>
                <td className='border-2 border-amber-50 text-center p-1'>{product.scl.price}</td>
                <td className='border-2 border-amber-50 text-center p-1'>{product.pcStudio.name}</td>
                <td className='border-2 border-amber-50 text-center p-1'>{product.pcStudio.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Homepage