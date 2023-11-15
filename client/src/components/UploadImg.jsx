import React from "react";
import "./../style/style.css";
import { BsCardImage } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";

function UploadImg() {
  return (
    <div className=" w-[300px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
      <label className="upload text-[25px] ">
        <input type="file" id="input" accept="image/png, image/jpg" />
        Send Image
        <BsCardImage className="inline ml-10" />
        <input type="file" id="input" accept="image/png, image/jpg" />
        Send Image
        <FaCameraRetro />
      </label>
    </div>
  );
}

export default UploadImg;
