import { useEffect, useState } from "react";
import Pagination from "./components/Pagination/Pagination";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [query, setNewQuery] = useState("");
  const keys = ["name", "role", "email"];

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json").then((data) => {
      let tempMark = data.data.map((e) => {
        return { ...e, isChecked: false };
      });
      setData(tempMark);
    });
  };

  const queryToApp = (payload) => {
    setNewQuery(payload);
  };

  const search = (data) => {
    return data?.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const setEditedDataToApp = (payload) => {
    const newData = data.map((e) => {
      if (payload.id === e.id) {
        return { ...e, ...payload };
      }
      return e;
    });

    setData(newData);
  };

  const DeleteTrToApp = (trData) => {
    const { id } = trData;
    const delUpdatedArr = data.filter((e) => e.id !== id);
    setData(delUpdatedArr);
  };

  return (
    <>
      <div className="App">
      <img src="/hq.webp" alt=""  />

        <Pagination
          queryToApp={queryToApp}
          data={search(data)}
          search={search()}
          setEditedDataToApp={setEditedDataToApp}
          DeleteTrToApp={DeleteTrToApp}
        />
      </div>
    </>
  );
}

export default App;
