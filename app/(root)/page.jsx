import { UserButton } from '@clerk/nextjs'
import MobileNav from '../components/MobileNav'


const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <h1><UserButton afterSignOutUrl='/'/>
  
      </h1>
    </section>
  )
}

export default Home