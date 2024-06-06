'use client'
import {useToast} from '../../@/components/ui/use-toast'
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { getImageSize } from '../utils';
import { dataUrl } from '../utils';


const MediaUpload = ({image,setImage,type,publicId}) => {
    const {toast}=useToast();
    const onUploadSuccess=(result)=>{

        setImage((prevState) => ({
            ...prevState,
            publicId: result?.info?.public_id,
            iwidth: result?.info?.width,
            iheight: result?.info?.height,
            width: result?.info?.width,
            height: result?.info?.height,
            secureURL: result?.info?.secure_url
          }))
           
        toast({
            title:"Upload Successful",
            description:"Try more",
            className:"toast-success bg-green-500 text-white flex ",
            duration:4000
        })

    }
    const onUploadError=(result)=>{
        toast({
            title:"Upload Failed",
            description:"Please try again",
            className:"toast-error",
            duration:4000
        })

    }


  return (
    <section className='flex-2'>
        <CldUploadWidget uploadPreset='ar6uti7x'
        onSuccess={onUploadSuccess}
        onError={onUploadError}
        
        options={{multiple:false,resourceType:'image'}}>

{({ open }) => (
        <div className="flex flex-col gap-4">
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>

          {publicId ? (
            <>
              <div className="cursor-pointer max-w-sm overflow-hidden rounded-[10px]">
                <CldImage 
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes={"(max-width: 767px) 100vw, 50vw"}
                  placeholder={dataUrl}
                  className="media-uploader_cldImage"
                />
              </div>
            </>
          ): (
            <div className="media-uploader_cta " onClick={() => open()}>
              <div className="media-uploader_cta-image">
                <Image 
                  src="/assets/icons/add.svg"
                  alt="Add Image"
                  width={24}
                  height={24}
                />
              </div>
                <p className="p-14-medium">Click here to upload image</p>
            </div>
          )}
        </div>
      )}

        </CldUploadWidget>
  
    </section>
  )
}

export default MediaUpload