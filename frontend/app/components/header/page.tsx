import React from 'react'

const Header = () => {
  return (
    <div className=' p-2 bg-cyan-600 font-mono flex justify-between'>
      <h1>LOGO</h1>
      <div className='flex'>
        <a className=' border-b-2 mr-6' href='/components/buildpc'>BUILD PC</a>
        <a className=' border-b-2' href='/components/homepage'>SEARCH PC PARTS</a>
      </div>
    </div>
  )
}

export default Header