import React from "react";
import "./../style/style.css";
import { BsCardImage } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";

function UploadImg() {
  return (
    <div className=" w-[300px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
      <label className="upload text-[25px] ">
        <p className="inline">Send Image</p>
        <input type="file" id="input" accept="image/png, image/jpg" />
        <BsCardImage className="inline ml-10" />
        <input type="file" id="input" accept="image/png, image/jpg" />
        <FaCameraRetro className="inline ml-2" />
      </label>
    </div>
  );
}

export default UploadImg;
