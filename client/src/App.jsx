import "./App.css";
import React from "react";
import Form from "./components/Form";
import List from "./components/List";
import axios from "axios";

function App() {
  const [entries, setEntries] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get("/api/entries");
      setEntries(data);
    };
    fetchData();
  }, []);

  const addEntryHandler = (formData) => {
    setEntries((prevEntries) => [...prevEntries, formData]);
  };

  const editEntryHandler = (id, entry) => {
    setEntries((prevEntries) => {
      const index = prevEntries.findIndex((entry) => entry._id === id);
      const cloneEntries = [...prevEntries];
      cloneEntries[index] = entry;
      return cloneEntries;
    });
  };

  const deleteEntryHandler = (id) => {
    setEntries((prevEntries) =>
      prevEntries.filter((entry) => entry._id !== id)
    );
  };

  return (
    <div className="App">
      <div className="container my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <h2>FORM</h2>
            <Form addEntryHandler={addEntryHandler} />
          </div>
          <div className="col-12 col-md-6">
            <h2>Display All</h2>
            <List
              entries={entries}
              editEntryHandler={editEntryHandler}
              deleteEntryHandler={deleteEntryHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
