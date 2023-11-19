import React, {useState} from "react";
import Searchbutton from "./Searchbutton";
import Toggle from "./Toggle";
import "./../style/style.css";
import UploadDataSet from "./UploadDataSet";

function AsideButton({
  handleFileChange,
  handleToggle,
  handleDatasetChange,
  handleSubmit,
  handleResult,

}){
  const [imageURL,setImageURL] = useState("assets/imgPlace.png")
  const handleImageChange = (event)=>{
    
    const file = event.target.files[0]
    console.log(file)
    const url = URL.createObjectURL(file)
    setImageURL(url)
    handleFileChange(file)
  }
  
  return (
    <div className="flex">
      <div className="basis-2/3">
        <div className="bg-slate-100 w-[500px] m-auto">
          <form
            onClick={() => document.querySelector(".input-field").click()}
          >
            <input
              type="file"
              accept="image/*"
              className="input-field"
              onChange={handleImageChange}
            />
            <img
              src={imageURL}
              className="object-cover h-auto w-[500px]"
              alt="gambar"
            />
          </form>
        </div>
      </div>
      <div className="basis-1/3 mt-[200px]">
        <Toggle onToggleChange={handleToggle} />
        <UploadDataSet onDatasetChange={handleDatasetChange} />
        <Searchbutton onSubmit= {handleSubmit} />
        <button onClick= {handleResult} className="my-3 w-[300px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] text-center border-4 rounded-[8rem] "> Show Result</button>
      </div>
      
      
    </div>
  );
  }

export default AsideButton;
