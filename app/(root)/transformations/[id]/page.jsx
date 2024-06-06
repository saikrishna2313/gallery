import React from 'react';
import { getImageById } from '../../../actions/image';
import Image from 'next/image';
import Download from '../../../components/Dowload';

const Page = async ({ params }) => {
  const getEdit = await getImageById(params.id);

  return (
    <section className="p-4">
      <h1 className="text-4xl uppercase font-semibold text-center mb-8">{getEdit.transformationType}</h1>
      <section className="w-full flex flex-col md:flex-row justify-center items-center gap-10 mb-8">
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">Before</h2>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              className="w-full h-auto max-w-md"
              src={getEdit.secureURL}
              width={getEdit.iwidth}
              height={getEdit.iheight}
              alt="Original Image"
            />
          </div>
        </section>
        <section className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4">After</h2>
          <div className="shadow-lg rounded-lg overflow-hidden">
            <Image
              className="w-full h-auto max-w-md"
              src={getEdit.afterURL}
              width={getEdit.width}
              height={getEdit.height}
              alt="Transformed Image"
            />
          </div>
        </section>
      </section>
      <div className="flex justify-center">
        <Download imageUrl={getEdit?.afterURL} />
      </div>
    </section>
  );
}

export default Page;
