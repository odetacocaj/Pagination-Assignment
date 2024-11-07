import Card from "../Card/Card";
import "./CardContainer.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../Pagination/Pagination";

const CardContainer = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/posts`, {
        params: {
          page: page,
          pageSize: pageSize,
        },
      });

      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, pageSize]);

  return (
    <>
      <div className="card-container">
        {data?.articles?.map((card) => (
          <Card
            key={card.title}
            title={card.title}
            body={card.description}
            imageLink={card.urlToImage}
          />
        ))}
      </div>
      <Pagination
        totalPages={data.totalPages}
        currentPage={page}
        setCurrentPage={setPage}
        setPageSize={setPageSize}
        pageSize={pageSize}
      />
    </>
  );
};

export default CardContainer;
