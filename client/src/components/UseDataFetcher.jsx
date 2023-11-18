import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const UseDataFetcher = () => {
  const API_URL = "http://localhost:5001/api/result";
  const totalPages = 100;
  
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      const page = Math.min(currentPage + 1, totalPages);
      
    
      
      
    };
    fetchData();
  }, [currentPage]);
  return {


    totalPages,
    currentPage,
    setCurrentPage,
  };
};

export default UseDataFetcher;
// 