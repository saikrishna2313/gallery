"use server";

const { revalidatePath } = require("next/cache");

const { redirect } = require("next/navigation");
const { v2: cloudinary } = require('cloudinary');
import connectDB from '../../Mongo/mongo'
import Image from '../models/Image';
import User from '../models/UserModel'
import { handleError } from '../utils';
const populateUser = (query) => query.populate({
    path: 'author',
    model: User,
    select: '_id firstName lastName clerkId'
  });
  

// ADD IMAGE
export async function addImage(image,type,userId,config) {
  try {
    await connectDB();

    const author = await User.findById(userId);

    if (!author) {
      throw new Error("User not found");
    }

    const newImage = await Image.create({
        title:image.title,
        transformationType:type,
        publicId:image.publicId,
        secureURL: image.secureURL,
        width:image.width,
        height:image.height,
        config:config,
        aspectRatio:image.aspectRatio,
        author:author._id,
        afterURL:image.afterURL,
        iwidth:image.iwidth,
        iheight:image.iheight
    });

    return JSON.parse(JSON.stringify(newImage));
  } catch (error) {
     throw new Error(error)
  }
}

// UPDATE IMAGE
async function updateImage({ image, userId, path }) {
  try {
    await connectToDatabase();

    const imageToUpdate = await Image.findById(image._id);

    if (!imageToUpdate || imageToUpdate.author.toHexString() !== userId) {
      throw new Error("Unauthorized or image not found");
    }

    const updatedImage = await Image.findByIdAndUpdate(
      imageToUpdate._id,
      image,
      { new: true }
    );

    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedImage));
  } catch (error) {
    handleError(error);
  }
}

// DELETE IMAGE
async function deleteImage(imageId) {
  try {
    await connectToDatabase();

    await Image.findByIdAndDelete(imageId);
  } catch (error) {
    handleError(error);
  } finally {
    redirect('/');
  }
}

// GET IMAGE
export async function getImageById(imageId) {
  try {
    await connectDB();

    const image = await populateUser(Image.findById(imageId));

    if (!image) throw new Error("Image not found");

    return JSON.parse(JSON.stringify(image));
  } catch (error) {
    throw new Error(error);
  }
}

// GET IMAGES
export async function getAllImages({searchQuery = '' }) {
  try {
    await connectDB();

    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });

    let expression = 'folder=varma';

    if (searchQuery) {
      expression += ` AND ${searchQuery}`;
    }

    const { resources } = await cloudinary.search
      .expression(expression)
      .execute();

    const resourceIds = resources.map((resource) => resource.public_id);

    let query = {};

    if (searchQuery) {
      query = {
        publicId: {
          $in: resourceIds
        }
      };
    }

   

    const images = await populateUser(Image.find(query))
      .sort({ updatedAt: -1 })
      



    return {
      data: JSON.parse(JSON.stringify(images)),
    };
  } catch (error) {
    throw new Error(error);
  }
}

// GET IMAGES BY USER
async function getUserImages({ limit = 9, page = 1, userId }) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;

    const images = await populateUser(Image.find({ author: userId }))
      .sort({ updatedAt: -1 })
      .skip(skipAmount)
      .limit(limit);

    const totalImages = await Image.find({ author: userId }).countDocuments();

    return {
      data: JSON.parse(JSON.stringify(images)),
      totalPages: Math.ceil(totalImages / limit),
    };
  } catch (error) {
    handleError(error);
  }
}


