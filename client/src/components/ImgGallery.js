import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const ImageGallery = ({ images }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-3 gap-4">
        {currentImages.map((image, index) => (
          <div key={index} className="border p-2">
            <img src={image.url} alt={`Image ${index + 1}`} className="w-full h-auto" />
            <p>Similarity: {image.similarity}</p>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
      />
    </div>
  );
};

export default ImageGallery;
