// ImageGallery.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination"; // Sesuaikan dengan path yang benar

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    axios
      .get("../dataset")
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images", error);
      });
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

  const totalPages = Math.ceil(images.length / imagesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto my-8">
      <div className="grid grid-cols-3 gap-4">
        {currentImages.map((image) => (
          <div key={image.id} className="border p-2">
            <img src={image.url} alt={image.title} className="w-full h-auto" />
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
