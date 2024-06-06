
import React from 'react'
import Sidebar from '../components/Sidebar'
import MobileNav from '../components/MobileNav'

const Layout = ({children}) => {
  return (
   <main className='root'>
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