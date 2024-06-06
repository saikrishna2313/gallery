


import { redirect } from 'next/navigation';
import { transformationTypes } from '../../../../../constants';
import { auth } from '@clerk/nextjs/server';
import {getUserById} from '../../../../actions/person'
import Header from '../../../../components/Header'
import TransformationForm from '../../../../components/TransformationForm'
const AddTransformationTypePage = async ({ params: { type } }) => {
  const { userId } =auth();
  const transformation = transformationTypes[type];

  if (!userId) redirect('/sign-in');

  const user = await getUserById(userId)

  return (
    <>
      <Header 
        title={transformation.title}
        subtitle={transformation.subTitle}
      />
    
      <section className="mt-10 w-full">
        <TransformationForm   action="Add"
          userId={user._id}
          type={transformation.type}
          
        />
      </section>
    </>
  );
};

export default AddTransformationTypePage;
