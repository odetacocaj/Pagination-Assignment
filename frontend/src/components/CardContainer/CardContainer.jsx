import Card from "../Card/Card";
import "./CardContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";

const CardContainer = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: "us",
          apiKey: "eceee8a4826e496bb4b015a6c8a21c58",
        },
      });

      const allArticles = response?.data.articles;
      setData(allArticles);
      setFilteredData(allArticles);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (filtered) => {
    setFilteredData(filtered);
  };

  const handlePaginatedDataChange = (newPaginatedData) => {
    setPaginatedData(newPaginatedData);
  };

  return (
    <>
      <div className="filter">
        <Filter data={data} onFilter={handleFilter} name="title" />
      </div>
      <div className="card-container">
        {paginatedData.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            body={card.description}
            imageLink={card.urlToImage}
          />
        ))}
      </div>
      <Pagination data={filteredData} onPageChange={handlePaginatedDataChange} />
    </>
  );
};

export default CardContainer;
