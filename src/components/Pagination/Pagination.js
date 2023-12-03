import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { IoArrowBackCircleSharp } from "@react-icons/all-files/io5/IoArrowBackCircleSharp";
import { IoArrowForwardCircleSharp } from "@react-icons/all-files/io5/IoArrowForwardCircleSharp";
import Table from "../Table/Table";
import styles from "./Pagination.module.css"
import { useState } from "react";

const Pagination = ({
  data,
  setEditedDataToApp,
  queryToApp,
  DeleteTrToApp,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataLimit] = useState(10);

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    return data.slice(startIndex, endIndex);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / dataLimit); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (e) => {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  };
  const toFirst = () => {
    setCurrentPage(1);
  };

  const toLast = () => {
    setCurrentPage(getPageNumbers().length);
  };

  const setEditedDataToPagination = (payload) => {
    setEditedDataToApp(payload);
  };

  const queryToPagination = (query) => {
    queryToApp(query);
  };

  const DeleteTrToPagination = (trData) => {
    DeleteTrToApp(trData);
  };

  return (
    <>
      <Table
        queryToPagination={queryToPagination}
        data={getPaginatedData()}
        setEditedDataToPagination={setEditedDataToPagination}
        DeleteTrToPagination={DeleteTrToPagination}
      />
      <div className={styles.editLayer}>
        <button onClick={toFirst} className={styles.prev}>
          <FaArrowLeft fontSize="30px" />
        </button>

        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={styles.prev}
        >
          <IoArrowBackCircleSharp fontSize="30px" />
        </button>

        {getPageNumbers().map((number) =>
          currentPage === number ? (
            <button
              key={number}
              className={styles.button}
              style={{ backgroundColor: "rgb(0, 0, 0)" }}
              onClick={changePage}
            >
              {number}
            </button>
          ) : (
            <button key={number} className={styles.button} onClick={changePage}>
              {number}
            </button>
          )
        )}
        <button
          onClick={goToNextPage}
          disabled={currentPage === getPageNumbers().length}
          className={styles.next}
        >
          <IoArrowForwardCircleSharp fontSize="30px" />
        </button>
        <button onClick={toLast} className={styles.prev}>
          <FaArrowRight fontSize="30px" />
        </button>
      </div>
    </>
  );
};

export default Pagination;
