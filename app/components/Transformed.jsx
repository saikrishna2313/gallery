'use client'
import { dataUrl } from '../utils'
import { CldImage, getCldImageUrl } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Transformed = ({ publicId, image, type, setImage,remove,replaceColor,recolor }) => {
  const [afterChange, setAfterChange] = useState('');
  
  useEffect(() => {
    let imageURL = '';

    if (type === 'restore') {
      imageURL = getCldImageUrl({
        src: publicId,
        restore: true,
      });
    }
    if (type === 'fill') {
      imageURL = getCldImageUrl({
        src: publicId,
        width:image.width,
        height:image.height,
         fillBackground:true
      });
      console.log(imageURL)
    }
    if (type === 'recolor') {
      imageURL = getCldImageUrl({
        src: publicId,
        recolor:[recolor,replaceColor]
         
      });
      console.log(imageURL)
    }

    if (type === 'removeBackground') {
      imageURL = getCldImageUrl({
        src: publicId,
        removeBackground: true,
      });
    }
    if (type === 'remove') {
      imageURL = getCldImageUrl({
        src: publicId,
        remove:remove,
      });
    }

    if (imageURL) {
   
      setImage((prevState) => ({
        ...prevState,
        afterURL: imageURL,
      }));
    }
  }, [publicId, type, setImage]);

  return (
    <section className='flex-1'>
      <h1 className='text-lg max-w-sm font-semibold'>Final Output</h1>
      
      {type === 'recolor' && (
        <CldImage
          width={image.width}
          height={image.height}
          src={publicId}
          alt='image'
          recolor={[recolor,replaceColor]}
          placeholder={dataUrl}
          sizes={'(max-width: 767px) 100vw, 50vw'}
          className='media-uploader_cldImage'
        />
      )}
      {type === 'removeBackground' && (
        <CldImage
          width={image.width}
          height={image.height}
          src={publicId}
          alt='image'
          removeBackground
          placeholder={dataUrl}
          sizes={'(max-width: 767px) 100vw, 50vw'}
          className='media-uploader_cldImage'
        />
      )}
      {type === 'fill' && (
        <CldImage
          width={image.width}
          height={image.height}
          src={publicId}
          alt='image'
          fillBackground
          placeholder={dataUrl}
          sizes={'(max-width: 767px) 100vw, 50vw'}
          className='media-uploader_cldImage'
        />
      )}
      {type === 'restore' && (
        <CldImage
          width={image.width}
          height={image.height}
          src={publicId}
          alt='image'
          restore
          placeholder={dataUrl}
          sizes={'(max-width: 767px) 100vw, 50vw'}
          className='media-uploader_cldImage'
        />
      )}
      {type === 'remove' && (
        <CldImage
          width={image.width}
          height={image.height}
          src={publicId}
          alt='image'
          remove={remove}
          placeholder={dataUrl}
          sizes={'(max-width: 767px) 100vw, 50vw'}
          className='media-uploader_cldImage'
        />
      )}
     
      
    </section>
  );
};

export default Transformed;
