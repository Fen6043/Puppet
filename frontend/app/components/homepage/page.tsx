
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation';

const Homepage = () => {
  const param = useSearchParams()
  const [sclProducts, setSCLProducts] = useState<{ name: string; price: string }[]>([]);
  const [pcStudioProducts, setPCStudioProducts] = useState<{ name: string; price: string }[]>([]);
  const searchQ = param.get("name") || "";
  const [searchQuery, setSearchQuery] = useState(searchQ);
  const [isLoading, setIsLoading] = useState(false);
  const [combinedProducts, setCombinedProducts] = useState<CombinedProduct[]>([]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  type CombinedProduct = {
    scl: { name: string; price: string };
    pcStudio: { name: string; price: string };
  };

    async function fetchProducts() {
      try {
        // console.log(`http://localhost:5000/scrapeSCL?searchQ=${encodeURIComponent(searchQuery)}`);
        setIsLoading(true);

        const data = await fetch(`http://localhost:5000/scrapeSCL?searchQ=${encodeURIComponent(searchQuery)}`).then(async (res) => {
          setIsLoading(false);
          if (res.status === 200)
            return res.json();
          else
          {
            const errorText = await res.text();
            console.log(errorText)
            return []
          }
        })
        .catch((error)=>{console.log(error)});

        setSCLProducts(data);
        setPCStudioProducts([{ name: "test1", price: "0" }, { name: "test2", price: "10" }]);
        // console.log("Fetched sclProducts:", data);
      } catch (error) {
        console.error("Error fetching sclProducts:", error);
      }
    }

    function sortProduct(e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) {
      const columnIndex = e.currentTarget.cellIndex;
      console.log(`Sorting column index: ${columnIndex}`);
      if (columnIndex === 1 || columnIndex === 3) {
        if (sortOrder === 'asc') {
          setSCLProducts([...sclProducts].sort((a, b) => parseFloat(a.price.split("₹")[1]) - parseFloat(b.price.split("₹")[1])));
          setSortOrder('desc');
        } else {
          setSCLProducts([...sclProducts].sort((a, b) => parseFloat(b.price.split("₹")[1]) - parseFloat(a.price.split("₹")[1])));
          setSortOrder('asc');
        }
      }
      else{
        if (sortOrder === 'asc') {
          setSCLProducts([...sclProducts].sort((a, b) => a.name.localeCompare(b.name)));
          setSortOrder('desc');
        } else {
          setSCLProducts([...sclProducts].sort((a, b) => b.name.localeCompare(a.name)));
          setSortOrder('asc');
        }
      }
    }
    
/* eslint-disable react-hooks/set-state-in-effect */
    useEffect(() => {
      if (searchQuery !== "") {
        fetchProducts();
      }
    }, []);

    useEffect(() => {
      const combined = Array.from({ length: Math.max(sclProducts.length, pcStudioProducts.length) }, (_, index) => {
      return {
        scl: sclProducts[index] || { name: "", price: "" },
        pcStudio: pcStudioProducts[index] || { name: "", price: "" },
      };
    });
      setCombinedProducts(combined);
      // console.log("Combined products updated:", combined);
    }, [sclProducts, pcStudioProducts]);
/* eslint-enable react-hooks/set-state-in-effect */

  return (
    <div>
      <div className='m-2 flex items-center justify-center'>
        <input className='border-2 border-amber-50 py-1 px-4' value={searchQuery} onChange={(e) =>{setSearchQuery(e.target.value)}} type="text" placeholder="Search for Products..." />
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
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none'>Name</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none' onClick={(e)=>{sortProduct(e)}}>Price</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none'>Name</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none'>Price</th>
            </tr>
          </thead>
          <tbody>
            {combinedProducts.map((product, index) => (
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