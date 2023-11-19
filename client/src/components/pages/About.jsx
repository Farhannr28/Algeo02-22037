import React from 'react';
import fotoKita from './pic.jpg'

const About = () => {
  return (
    <div className='my-[50px] text-white block mb-[200px]'>
        <div className='flex justify-center text-2xl'><p className='my-6'><i>Created by ITB informatics engineering students to fulfill their final assignment in the geometric linear algebra course</i></p></div>
        <div className='flex justify-center'>
            <img src={fotoKita} alt="" className='w-[50%]' />

        </div>
        <div className='text-center'>
            <h1 className='my-7 text-4xl'>We are nama kelompok</h1>
            <ul className=' text-2xl'>
                <li>13522120 <span className='ml-[100px]'> Muhamad Rifki Virziadeili Harisman</span></li>
                <li>13522120 <span className='ml-[100px]'> Muhamad Rifki Virziadeili Harisman</span></li>
                <li>13522120 <span className='ml-[100px]'> Muhamad Rifki Virziadeili Harisman</span></li>
            </ul>
        </div>
       
    </div>
  );
};

export default About;