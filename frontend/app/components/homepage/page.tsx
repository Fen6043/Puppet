
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
  const [sortOrder0, setSortOrder0] = useState<'asc' | 'desc'>('asc');
  const [sortOrder1, setSortOrder1] = useState<'asc' | 'desc'>('asc');
  const [sortOrder2, setSortOrder2] = useState<'asc' | 'desc'>('asc');
  const [sortOrder3, setSortOrder3] = useState<'asc' | 'desc'>('asc');

  type CombinedProduct = {
    scl: { name: string; price: string };
    pcStudio: { name: string; price: string };
  };

    async function fetchProducts() {
      try {
        // console.log(`http://localhost:5000/scrapeSCL?searchQ=${encodeURIComponent(searchQuery)}`);
        setIsLoading(true);

        const data1 = await fetch(`http://localhost:5000/scrapeSCL?searchQ=${encodeURIComponent(searchQuery)}`)
        const data2 = await fetch(`http://localhost:5000/scrapePCS?searchQ=${encodeURIComponent(searchQuery)}`)


        if (data1.status === 200 && data2.status === 200){
          const SCLProduct = await data1.json()
          const PCSProduct = await data2.json()
          console.log(SCLProduct)
          console.log("----------------------------------")
          console.log(PCSProduct)
          setSCLProducts(SCLProduct)
          setPCStudioProducts(PCSProduct);
        }
        else{
          const errorText = await data2.text();
          console.log("error while fetching PCS: ",errorText)
        }

        setIsLoading(false);
        
      } catch (error) {
        console.error("Error fetching sclProducts:", error);
      }
    }

    function sortProduct(e: React.MouseEvent<HTMLTableCellElement, MouseEvent>) {
      const columnIndex = e.currentTarget.cellIndex;
      console.log(`Sorting column index: ${columnIndex}`);
      if (columnIndex === 0) {
        if (sortOrder0 === 'asc') {
          setSCLProducts([...sclProducts].sort((a, b) => a.name.localeCompare(b.name)));
          setSortOrder0('desc');
        } else {
          setSCLProducts([...sclProducts].sort((a, b) => b.name.localeCompare(a.name)));
          setSortOrder0('asc');
        }
      }
      else if (columnIndex === 1) {
        if (sortOrder1 === 'asc') {
          setSCLProducts([...sclProducts].sort((a, b) => parseFloat(a.price.split("₹")[1]) - parseFloat(b.price.split("₹")[1])));
          setSortOrder1('desc');
        } else {
          setSCLProducts([...sclProducts].sort((a, b) => parseFloat(b.price.split("₹")[1]) - parseFloat(a.price.split("₹")[1])));
          setSortOrder1('asc');
        }
      }
      else if (columnIndex === 2) {
        if (sortOrder2 === 'asc') {
          setPCStudioProducts([...pcStudioProducts].sort((a, b) => a.name.localeCompare(b.name)));
          setSortOrder2('desc');
        }
        else {
          setPCStudioProducts([...pcStudioProducts].sort((a, b) => b.name.localeCompare(a.name)));
          setSortOrder2('asc');
        }
      }
      else if (columnIndex === 3) {
        if (sortOrder3 === 'asc') {
          setPCStudioProducts([...pcStudioProducts].sort((a, b) => parseFloat(a.price.split("₹")[1]) - parseFloat(b.price.split("₹")[1])));
          setSortOrder3('desc');
        } else {
          setPCStudioProducts([...pcStudioProducts].sort((a, b) => parseFloat(b.price.split("₹")[1]) - parseFloat(a.price.split("₹")[1])));
          setSortOrder3('asc');
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
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none hover:text-cyan-500' onClick={(e)=>{sortProduct(e)}}>Name</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none hover:text-cyan-500' onClick={(e)=>{sortProduct(e)}}>Price</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none hover:text-cyan-500' onClick={(e)=>{sortProduct(e)}}>Name</th>
              <th className='border-2 border-amber-50 p-2 cursor-pointer hover:select-none hover:text-cyan-500' onClick={(e)=>{sortProduct(e)}}>Price</th>
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