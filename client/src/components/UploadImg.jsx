import React from "react";
import "./../style/style.css";
import { BsCardImage } from "react-icons/bs";
import { useState } from "react";
function UploadImg({onFileChange}) {
  const [imageURL,setImageURL] = useState("E:\Tubes-Algeo2\Algeo02-22037\client\public\assets\imbawan.jpg")
  const handleFileChange = (event)=>{
    
    const file = event.target.files[0]
    console.log(file)
    const url = URL.createObjectURL(file)
    setImageURL(url)
    onFileChange(file)

  }
  return (
    <div>
      <div>
    {imageURL && <img src={imageURL}alt = ""></img>}
    </div>
    <div className=" w-[300px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
      
      <label className="upload text-[34px] ">
        <input type="file" id="inputImg" accept=".jpg , .png" onChange={handleFileChange} />
        Send Image
        <BsCardImage className="inline ml-10" />
      </label>
      
    </div>
    
    </div>
  );
}

export default UploadImg;
