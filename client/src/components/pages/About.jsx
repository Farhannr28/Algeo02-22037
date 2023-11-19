import React from 'react';
import fotoKita from './pic.jpg'

const About = () => {
  return (
    <div className='my-[50px] text-white block mb-[200px]'>
        <div className='flex justify-center text-2xl'><p className='my-6'><i>Created by ITB informatics engineering students to fulfill their final assignment in the geometric linear algebra course</i></p></div>
        <div className='flex justify-center'>
            <img src={fotoKita} alt="" className='w-[50%]' />

        </div>
        <div className='grid grid-cols-12'>
            <h1 className='col-start-6 col-span-3 my-7 text-4xl'>We are nama kelompok</h1>
            <ul className=' text-2xl col-start-5 col-span-6'>
                <li>13522037 <span className='ml-[300px]'> Farhan Nafis Rayhan</span></li>
                <li>13522079 <span className='ml-[300px]'> Emery Fathan Zwageri</span></li>
                <li>13522120 <span className='ml-[300px]'> Muhamad Rifki Virziadeili Harisman</span></li>
            </ul>
        </div>
        {/* <footer className='my-[100px] text-3xl flex justify-center'><b>calon software engineer google</b></footer> */}
       
    </div>
  );
};

export default About;