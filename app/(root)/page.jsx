import { UserButton } from '@clerk/nextjs'
import MobileNav from '../components/MobileNav'
import { getAllImages } from '../actions/image'
import Image from 'next/image';
import Link from 'next/link';
import { Download } from 'lucide-react';


const Home =async() => {
    const {data}=await getAllImages({searchQuery:""});
 
   
  return (
    <section  className='Home'>
        <section>
          <form>
            <input  className='w-full px-3 py-2 shadow-xl my-3'  type="text" placeholder='Search Something'/>
          </form>
        <section className='grid w-full grid-cols-4'>
          {
            data.map((item)=>{
              return(
                <Link href={`/transformations/${item?._id}`} className=' flex flex-col p-2 bg-slate-100 m-1 justify-start items-start shadow-xl'>
                  <img  src={item?.secureURL} className='object-cover w-[100%] h-[100%]'/>
                  <h1 className='text-lg font-semibold'>{item?.title}</h1>
                  </Link>
              )
            })
          }
        </section>
       
        </section>     
    </section>
  )
}

export default Home