"use server"

import connectDB from "../../Mongo/mongo";
import User from "../models/UserModel"

export const addData=async(formData)=>{
    const name=formData.get('name');
    connectDB();
    const user=await User.create({
        name:name
        

    })
}