import React from "react";

function Navbar() {
  return (
    <div className=" my-2 flex ml-12 navbar">
      <img
        src="assets/imbawan.jpg"
        alt="panutankita"
        className="h-[46px] w-auto mx-10 my-3"
      />
      <div className="">
        <span className="text-[40px] text-[#F3EEEA] py-12">
          <a href = "/">Reverse Image Search</a>
        </span>
      </div>
    </div>
  );
}

export default Navbar;
