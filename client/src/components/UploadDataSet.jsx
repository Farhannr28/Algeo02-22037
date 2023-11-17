import React, { useState, useEffect } from "react";
import { RiFolderImageLine } from "react-icons/ri";

function UploadDataSet({ onDatasetChange }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uniqueFolderNames, setUniqueFolderNames] = useState([]);
  const handleDatasetChange = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    setSelectedFiles(fileList);
    onDatasetChange(fileList);
  };
  useEffect(() => {
    // Extract unique folder names from selectedFiles
    const uniqueNames = [...new Set(selectedFiles.map((file) => getFolderName(file.webkitRelativePath)))];
    setUniqueFolderNames(uniqueNames);
  }, [selectedFiles]);

  return (
    <div className="my-3 border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] flex justify-center border-4 rounded-[8rem]">
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

      {selectedFiles.length > 0 && (
        <div className="mt-2">
          <p>Selected Folders:</p>
          <ul>
          {uniqueFolderNames.map((folderName, index) => (
              <li key={index}>{folderName}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Helper function to extract folder name from path
const getFolderName = (path) => {
  const lastSlashIndex = path.lastIndexOf("/");
  return path.substring(0, lastSlashIndex);
};

export default UploadDataSet;
