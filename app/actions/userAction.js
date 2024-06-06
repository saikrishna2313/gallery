"use server";

import { revalidatePath } from "next/cache";
import connectDB from "../Mongo/mongo";
import User from '../models/UserModel'

// CREATE
export async function createUser(user) {
  try {
    await connectDB();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw new Error(error);
  }
}

// READ
export async function getUserById(userId) {
  try {
    await connectDB();

    const user = await User.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    throw new Error(error);
  }
}

// UPDATE
export async function updateUser(clerkId, user) {
  try {
    await connectDB();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    throw new Error(error);
  }
}

// DELETE
export async function deleteUser(clerkId) {
  try {
    await connectDB();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    throw new Error(error);
  }
}

