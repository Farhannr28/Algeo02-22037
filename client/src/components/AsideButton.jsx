import React from "react";
import Searchbutton from "./Searchbutton";
import Toggle from "./Toggle";
import UploadImg from "./UploadImg";
import UploadDataSet from "./UploadDataSet";

function AsideButton() {
  return (
    <div className="grid grid-cols-5">
      <div className="col-start-2">
        <UploadImg />
      </div>
      <div className="col-start-2 col-end-4 flex align-middle">
        <Toggle />
        <UploadDataSet />
      </div>
      <div className="col-start-2">
        <Searchbutton />
      </div>
    </div>
  );
}

export default AsideButton;
