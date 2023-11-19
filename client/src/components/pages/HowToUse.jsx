import React from 'react';
import { FaSearch } from "react-icons/fa";

const HowToUse = () => {
  return (
    <div className='my-[50px] text-white block mb-[200px]'>
        <div className='flex  text-5xl mx-[300px] bg-[#6C5F5B] rounded-xl'>
            <h1 className='my-6 mx-10'>Let's search what you see!!</h1>
            <FaSearch className='justify-end' />
        </div>
        <div className='flex justify-center'>
           

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

export default HowToUse;