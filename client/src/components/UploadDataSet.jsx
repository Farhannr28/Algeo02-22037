import React from "react";
import { RiFolderImageLine } from "react-icons/ri";

function UploadDataSet() {
  return (
    <div className="my-3 w-[100px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
      <label className="upload text-[25px]">
        <input type="file" id="input" accept=".zip" />
        <RiFolderImageLine />
      </label>
    </div>
  );
}

export default UploadDataSet;
