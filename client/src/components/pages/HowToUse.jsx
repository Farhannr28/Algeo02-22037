import React from 'react';
import { FaSearch } from "react-icons/fa";

const HowToUse = () => {
  return (
    <div className='my-[50px] text-white block mb-[200px]'>
        <div className=' py-16 mt-[200px] text-5xl mx-[300px] bg-[#6C5F5B] rounded-xl'>
            <h1 className=' mx-10 mb-16'>Let's search what you see!!<FaSearch className='ml-5 inline' /></h1>
            <div className='inline-block'>
                <ul className='px-20 text-[25px]'>
                    <li className='ml-2 my-4 text-justify'>1. Masukkan input berupa gambar yang ingin dicari di dalam dataset. Click foto dummy untuk memasukkan input.</li>
                    <li className='ml-2 my-4 text-justify'>2. Pilih mode pencarian, CBIR warna atau CBIR tekstur. Pilih dengan cara klik toggle.</li>
                    <li className='ml-2 my-4 text-justify'>3. Masukkan dataset dengan cara klik icon folder. Masukkan folder yang berisikan database yang akan dijadikan acuan.</li>
                    <li className='ml-2 my-4 text-justify'>4. Klik <i>search</i>, tunggu beberapa saat.</li>
                    <li className='ml-2 my-4 text-justify'>4. Kemudian klik <i>show result</i>.</li>
                </ul>
            </div>
            
        </div>
        <div className='flex justify-center'>
           

        </div>

       
    </div>
  );
};

export default HowToUse;