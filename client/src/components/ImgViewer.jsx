import React from "react";

function ImgViewer() {
  return (
    <div class="mt-5 border bg-gradient-to-r from-[#ED7D31] to-[#FF9130]">
      <div class="my-10 mx-5">
        <div class="mx-auto my-auto">
          <img
            src="assets/pic.jpg"
            alt="gambar input"
            class="rounded-lg border w-[50%] h-auto mx-auto border-gray-400"
          />
        </div>
      </div>
    </div>
  );
}

export default ImgViewer;
