import React from "react";
import { RiFolderImageLine } from "react-icons/ri";

function UploadDataSet() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDatasetChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setSelectedFiles(fileList);
    onDatasetChange(fileList);
  };

  return (
    <div className="my-3 w-[100px] h-[39px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
      <label className="upload text-[25px]">
        <input
          type="file"
          id="input-dataset"
          webkitdirectory="true"
          multiple
          onChange={handleDatasetChange}
        />
        <RiFolderImageLine />
      </label>
    </div>
  );
}

export default UploadDataSet;
