import React from "react";

function Searchbutton({onSubmit}) {
  console.log("Type of onSubmit:", typeof onSubmit);
  const handleSubmit = () => {
    // Call the onSubmit function passed as a prop
    onSubmit();
  };
  return (
    <div className="my-3 w-[300px] border-[#776b5d] bg-[#ebe3d5] text-[#776b5d] text-center border-4 rounded-[8rem] ">
      <label>
        <button id = "submit" onClick={handleSubmit}>Search</button>
      </label>
    </div>
  );
}

export default Searchbutton;
