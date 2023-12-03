import "./table.css";

import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";

import Row from "../Rows/Row";
const Table = ({
  data,
  setEditedDataToPagination,
  DeleteTrToPagination,
}) => {
  const [newData, setNewData] = useState([]);
  const keys = ["name", "role", "email"];
  useEffect(() => {
    setNewData(data);
  }, [data]);
  console.log(newData);
  const handleQuery = (e) => {
    return data?.filter((item) =>
      keys.some((key) => {
        console.log(key, item);
        return item[key].toLowerCase().includes(e.target.value);
      })
    );
  };
  const handleSearch = (e) => {
    console.log(e.target.value);
    var da = handleQuery(e);
    setNewData(da);
  };
  const saveEditedData = (payload) => {
    setEditedDataToPagination(payload);
  };

  const handleSelectToTable = (name, checked) => {
    handleSelect(name, checked);
  };

  const checkAll = (e) => {
    const { name, checked } = e.target;
    handleSelect(name, checked);
  };

  const handleSelect = (name, checked) => {
    if (name === "allSelect") {
      let tempData = newData.map((e) => {
        return { ...e, isChecked: checked };
      });
      setNewData(tempData);
    } else {
      let tempData = newData.map((e) =>
        e.name === name ? { ...e, isChecked: !checked } : e
      );
      setNewData(tempData);
    }
  };

  const DeleteTr = (trData) => {
    DeleteTrToPagination(trData);
  };

  const deleteSelected = (e) => {
    e.preventDefault();
    const delSelectData = newData.filter((e) => e.isChecked !== true);
    setNewData(delSelectData);
  };

  return (
    <>
      <div className="search">
        <input
          type="text"
          id="search"
          placeholder="Search...."
          onChange={handleSearch}
        />


<button className="deleteButton" onClick={deleteSelected}>
        <MdDeleteOutline size={25} />
      </button>
      </div>
      <table id="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                name="allSelect"
                size={20}
                onChange={checkAll}
                checked={
                  newData.filter((d) => d?.isChecked !== true).length < 1
                }
              />
            </th>
            <th>
              <h3 style={{ color: "grey" }}>Name</h3>
            </th>
            <th>
              <h3 style={{ color: "grey" }}>Email</h3>
            </th>
            <th>
              <h3 style={{ color: "grey" }}>Role</h3>
            </th>
            <th>
              <h3 style={{ color: "grey" }}>Action</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {newData.map((e, index) => (
            <tr
              className={!e.isChecked ? "nc" : "bc"}
              key={index + Math.random()}
            >
              <Row
                e={e}
                saveEditedData={saveEditedData}
                handleSelectToTable={handleSelectToTable}
                DeleteTr={DeleteTr}
              />
            </tr>
          ))}
        </tbody>
      </table>
      
    </>
  );
};

export default Table;
