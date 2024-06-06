
import { addData } from "../actions/testAction"

const page = () => {
    const add=async(formData)=>{
        "use server"
        await addData(formData)
    }
  return (
    <form action={add}>
        <input type="text" placeholder="name" name="name"/>
        <button type="submit">Submit</button>
    </form>
  )
}

export default page