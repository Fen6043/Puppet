'use client'
import {usePathname,useRouter} from 'next/navigation'

const Header = () => {
  const path = usePathname()
  const router = useRouter()

  async function handleLogout(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.preventDefault()
    await fetch("http://localhost:5000/usedb/logoutUser", {
      method: "POST",
      credentials: "include"
    });
    router.push('/auth/login');
  }

  return (
    <div className=' p-2 bg-cyan-600 font-mono flex justify-between'>
      <h1>LOGO</h1>
      <div className='flex'>
        {path.startsWith('/components') && <a className=' border-b-2 mr-6 hover:text-amber-400' href='/components/buildpc'>BUILD PC</a>}
        {path.startsWith('/components') && <a className=' border-b-2 mr-6 hover:text-amber-400' href='/components/homepage'>SEARCH PC PARTS</a>}
        {path.startsWith('/components') && <a className='border-b-2 mr-6 cursor-pointer hover:text-red-600' onClick={(e) => handleLogout(e)}>LOGOUT</a>}
        {(path === '/auth/login' || path === '/') && <a className=' border-b-2 mr-2 hover:text-amber-400' href='/auth/signup'>Sign Up</a>}
        {path === '/auth/signup' && <a className=' border-b-2 mr-2 hover:text-amber-400' href='/auth/login'>Login</a>}
      </div>
    </div>
  )
}

export default Header