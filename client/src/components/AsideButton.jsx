import React from "react";
import Searchbutton from "./Searchbutton";
import Toggle from "./Toggle";
import UploadImg from "./UploadImg";
import UploadDataSet from "./UploadDataSet";

function AsideButton({
  handleFileChange,
  handleToggle,
  handleDatasetChange,
  handleSubmit,
  
}){
  return (
    <div className="grid grid-cols-5">
      <div className="col-start-2">
        <UploadImg onFileChange={handleFileChange}/>
      </div>
      <div className="col-start-2 col-end-4 flex align-middle">
        <Toggle onToggleChange={handleToggle} />
        <UploadDataSet onDatasetChange={handleDatasetChange} />
      </div>
      <div className="col-start-2">
        <Searchbutton onSubmit= {handleSubmit} />
      </div>
      
    </div>
  );
  }

export default AsideButton;
