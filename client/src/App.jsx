import React, { useEffect, useState } from "react";
import AsideButton from "./components/AsideButton";
import Searchbutton from "./components/Searchbutton";
import Toggle from "./components/Toggle";
import UploadImg from "./components/UploadImg";
import UploadDataSet from "./components/UploadDataSet";
import UseDataFetcher from "./components/UseDataFetcher";
import UserProfile from "./components/UserProfile";
import ImageGallery from "./components/ImgGallery";

import Navbar from "./components/Navbar";
import PaginationButtons from "./components/PaginationButtons";

function App() {
  const [uploadImg, setUploadImg] = useState(null)
  const [dataSet,setUploadDataSet] = useState([])
  const [toggle,setToggle] = useState("color")
  // useEffect(() => {
  //   fetch("/api")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUploadDataSet(data);
  //     });
  // }, []);
  const handleFileChange = (event)=>{
    console.log(event)
    
    setUploadImg(event)
  }
  const handleDatasetChange = (event)=>{
    console.log(event)
    setUploadDataSet(event)
  }
  const handleToggle = ()=>{
    if(toggle=="color"){
      setToggle("texture")
    }else{
      setToggle("color")
    }
    console.log(toggle)

  }
  const handleSubmit = ()=>{
    
    const formData = new FormData()
    const formDataset = new FormData()
    console.log(uploadImg)
    formData.append("inputImg",uploadImg)
    console.log("formdataajg", dataSet)
    if(dataSet){
      for(var i =0 ;i<dataSet.length;i++){
        formDataset.append("inputDataset", dataSet[i])
      }
    }
    console.log(toggle)
    formData.append("toggleStatus",toggle)
    fetch('/api/submit', {
      method: 'POST',
      body: formData,
    })
      .then((res)=>console.log(res))
      .then((data) => {
        console.log('Data successfully submitted:', data);
        // Handle any additional logic after successful submission
      })
    fetch ('/api/dataset',{
      method : 'POST',
      body: formDataset
    })
      .then((data)=>{
        console.log("data succesfully submitted: ", data)
      } )
  }
  

  const { loading, pages, totalPages, currentPage, setCurrentPage } =
    UseDataFetcher();



  return (
    <>
      <Navbar />
      <div className="flex flex-row mx-10 h-[50] ">
        <div className="basis-1/3 flex justify-center items-center">
        <AsideButton
          handleFileChange={handleFileChange}
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
      <ImageGallery />
    </>
  );
}

export default App;
