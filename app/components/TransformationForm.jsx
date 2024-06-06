'use client'
import { useEffect, useState } from 'react';
import { defaultValues } from '../../constants';
import Transformed from './Transformed';
import MediaUpload from './MediaUpload';
import { addImage } from '../actions/image';
import { redirect, useRouter } from 'next/navigation';
const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "4:3": {
    aspectRatio: "4:3",
    label: "Standard Landscape (4:3)",
    width: 1334,
    height: 1000,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
  "16:9": {
    aspectRatio: "16:9",
    label: "HD Video (16:9)",
    width: 1778,
    height: 1000,
  },
  "21:9": {
    aspectRatio: "21:9",
    label: "Cinematic (21:9)",
    width: 2100,
    height: 900,
  },
  "1.85:1": {
    aspectRatio: "1.85:1",
    label: "Widescreen (1.85:1)",
    width: 1850,
    height: 1000,
  },
};

const TransformationForm = ({ userId, type, action }) => {
  const [selectedAspectRatio, setSelectedAspectRatio] = useState("1:1");
  const [prompt, setPrompt] = useState('');
  const [objectToRecolor, setObjectToRecolor] = useState('');
  const [replacementColor, setReplacementColor] = useState('');
  const [image, setImage] = useState(defaultValues);
  const [load, setLoad] = useState(false);
  const [handleUpload, setHandleUpload] = useState(false);
  const [config,setConfig]=useState({})
  console.log(image);

  const handleAspectRatioChange = (event) => {
   
    const aspectRatioKey = event.target.value;
    const aspectRatio = aspectRatioOptions[aspectRatioKey];
    console.log(aspectRatio)
    setSelectedAspectRatio(aspectRatioKey);

    setImage((prevState) => ({
      ...prevState,
      width: aspectRatio.width,
      height: aspectRatio.height,
      aspectRatio:selectedAspectRatio


    
    }));
  
  };

  useEffect(()=>{
     if(type=="fill"){
      setConfig({
        fillBackground:true
      })
     }
     if(type=="recolor"){
      setConfig({
        recolor:true
      })
     }
     if(type=="restore"){
      setConfig({
        restor:true
      })
     }
     if(type=="removeBackground"){
      setConfig({
        removeBackground:true
      })
     }
     if(type=="remove"){
      setConfig({
        remove:true
      })
     }
  },[])

  const handleImageTitleChange = (event) => {
    setImage((prevState) => ({
      ...prevState,
      title: event.target.value,
    }));
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleObjectToRecolorChange = (event) => {
    setObjectToRecolor(event.target.value);
  };

  const handleReplacementColorChange = (event) => {
    setReplacementColor(event.target.value);
  };
  const router=useRouter();
  const handleSubmit =async (event) => {
    event.preventDefault();
   
   const newImage=await addImage(image,type,userId,config)
     router.push(`/transformations/${newImage._id}`)



  };

  return (
    <div className="flex w-full flex-col">
      <form onSubmit={handleSubmit} className="bg-white flex-col gap-2 flex w-full p-8 rounded shadow-md ">
        <h1 className="text-2xl font-bold mb-6 text-center">Image Transformation</h1>

        <div className="mb-4">
          <label htmlFor="image-title" className="block text-gray-700 mb-2">Image Title</label>
          <input required
            id="image-title"
            type="text"
            value={image.title}
            onChange={handleImageTitleChange}
            className="block w-full p-2 border border-gray-300 rounded"
            placeholder="Enter image title"
          />
        </div>

        {type === "fill" && (
          <div className="mb-4">
            <label htmlFor="aspect-ratio" className="block text-gray-700 mb-2">Aspect Ratio</label>
            <select
              id="aspect-ratio"
              value={selectedAspectRatio}
              onChange={handleAspectRatioChange}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              {Object.keys(aspectRatioOptions).map(key => (
                <option key={key} value={key}>
                  {aspectRatioOptions[key].label}
                </option>
              ))}
            </select>
          </div>
        )}

        {type === "remove" && (
          <div className="mb-4">
            <label htmlFor="prompt" className="block text-gray-700 mb-2">Object to Remove</label>
            <input
              id="prompt"
              type="text"
              value={prompt}
              onChange={handlePromptChange}
              className="block w-full p-2 border border-gray-300 rounded"
              placeholder="Enter prompt"
            />
          </div>
        )}

        {type === "recolor" && (
          <>
            <div className="mb-4">
              <label htmlFor="object-to-recolor" className="block text-gray-700 mb-2">Object to Recolor</label>
              <input
                id="object-to-recolor"
                type="text"
                value={objectToRecolor}
                onChange={handleObjectToRecolorChange}
                className="block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter object to recolor"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="replacement-color" className="block text-gray-700 mb-2">Replacement Color</label>
              <input
                id="replacement-color"
                type="text"
                value={replacementColor}
                onChange={handleReplacementColorChange}
                className="block w-full p-2 border border-gray-300 rounded"
                placeholder="Enter replacement color"
              />
            </div>
          </>
        )}

        <section className='flex items-center  gap-5 w-full'>
          <MediaUpload publicId={image?.publicId} image={image} setImage={setImage} type={type} />
          {handleUpload && (
            <section className='px-10 flex gap-3'>
              {load ? (
                <Transformed recolor={objectToRecolor} replaceColor={replacementColor} remove={prompt} publicId={image?.publicId} image={image} setImage={setImage} type={type} />
              ) : (
              <div className="animate-spin rounded-full w-8 h-6 border-r-2 border-blue-600">
                
              </div>
              )}
            </section>
          )}
        </section>

        <div className='w-full mt-1 gap-5 flex flex-col'>
         
          {
            load&&<button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Save
          </button>
          }
        </div>
      </form>
      <button  disabled={!image.publicId&&true}
            onClick={() => {
              const timeP=type==="removeBackground"? 10000:3000
              setLoad(false);
              setHandleUpload(true);
              setTimeout(() => {
                setLoad(true);
              }, timeP);
            }}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Process
          </button>
    </div>
  );
};

export default TransformationForm;
