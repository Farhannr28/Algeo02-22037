import React from "react";
import Searchbutton from "./Searchbutton";
import Toggle from "./Toggle";
import UploadDataSet from "./UploadDataSet";

function AsideButton({ handleToggle, handleDatasetChange, handleSubmit }) {
  return (
    <div className="grid grid-cols-5">
      <div className="col-start-2 col-end-4">
        <Toggle className="inline" onToggleChange={handleToggle} />
        <UploadDataSet
          className="inline"
          onDataSetChange={handleDatasetChange}
        />
      </div>
      <div className="col-start-2">
        <Searchbutton onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default AsideButton;
