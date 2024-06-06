
import React from 'react'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'
import { Toaster } from '../../@/components/ui/toaster'

const Layout = ({children}) => {
  return (
   <main className='root'>
      <Toaster/>
    <Sidebar/>
    <MobileNav/>
        <section className='root-container'>
            <section className='wrapper'>
            {children}
            </section>
          
        </section>
     
   </main>
  )
}

export default Layout