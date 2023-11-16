import AsideButton from "./components/AsideButton.jsx";
import ImageGallery from "./components/ImgGallery.js";
import ImgViewer from "./components/ImgViewer.jsx";
import Navbar from "./components/Navbar.jsx";
import PaginationButtons from "./components/PaginationButtons";
import UseDataFetcher from "./components/UseDataFetcher";
import UserProfile from "./components/UserProfile";
import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    UseDataFetcher();
  return (
    <>
      <Navbar />
      <div className="flex flex-row mx-10 h-[50] ">
        <div className="basis-2/3">
          <ImgViewer />
        </div>
        <div className="basis-1/3 flex justify-center items-center">
          <AsideButton />
        </div>
      </div>
      <div className="font-Poppins section">
        {loading ? (
          <div className="text-center text-5xl">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-6">
              {pages.map((page) => {
                return <UserProfile key={page.id} {...page} />;
              })}
            </div>
            <PaginationButtons
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
      <ImageGallery />
    </>
  );
}

export default App;
