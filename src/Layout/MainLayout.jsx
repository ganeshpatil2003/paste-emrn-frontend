import Navbar from '@/components/Navbar'

import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    
    <div className='min-w-screen min-h-screen bg-[#000000] text-[#ecedee]'>
       <div><Navbar /></div> 
       <div className=''>
            <Outlet/>
       </div>
    </div>
  )
}

export default MainLayout