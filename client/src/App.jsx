import AsideButton from "./components/AsideButton.jsx";
import Camera from "./components/Camera.jsx";
import Navbar from "./components/Navbar.jsx";
import PaginationButtons from "./components/PaginationButtons";
import UseDataFetcher from "./components/UseDataFetcher";
import UserProfile from "./components/UserProfile";
import "./style/style.css";
import React, { useState } from "react";

function App() {
  // const [backendData, setBackendData] = useState([{}]);

  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setBackendData(data);
  //     });
  // }, []);

  const [imageSrc, setImageSrc] = useState("assets/imgPlace.png");
  const [dataSet, setUploadDataSet] = useState([]);
  const [toggle, setToggle] = useState("color");

  //fetch dataset
  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    UseDataFetcher();

  //upload img
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  //upload dataSet
  const handleDatasetChange = (event) => {
    console.log(event);
    setUploadDataSet(event);
  };
  const handleToggle = () => {
    if (toggle == "color") {
      setToggle("texture");
    } else {
      setToggle("color");
    }
    console.log(toggle);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    const formDataset = new FormData();
    console.log(uploadImg);
    formData.append("inputImg", uploadImg);
    console.log("formdataajg", dataSet);
    if (dataSet) {
      for (var i = 0; i < dataSet.length; i++) {
        formDataset.append("inputDataset", dataSet[i]);
      }
    }
    console.log(toggle);
    formData.append("toggleStatus", toggle);
    fetch("/api/submit", {
      method: "POST",
      body: formData,
    })
      .then((res) => console.log(res))
      .then((data) => {
        console.log("Data successfully submitted:", data);
        // Handle any additional logic after successful submission
      });
    fetch("/api/dataset", {
      method: "POST",
      body: formDataset,
    }).then((data) => {
      console.log("data succesfully submitted: ", data);
    });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row mx-10 h-[50] my-10">
        <div className="basis-2/3 ">
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
                src={imageSrc}
                className="object-cover h-auto w-[500px]"
                alt="gambar"
              />
            </form>
          </div>
        </div>
        <div className="basis-1/3 flex justify-center items-center">
          <AsideButton
            handleToggle={handleToggle}
            handleDatasetChange={handleDatasetChange}
            handleSubmit={handleSubmit}
          />
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
      <Camera />
    </>
  );
}

export default App;
