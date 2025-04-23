import { useState, useEffect, useRef } from "react";
import "./App.css";
import initialDataList from "./initialDataList.jsx";
import { Card, Button, Flex } from "antd";

function App() {
  const timers = useRef({});
  const [initialData, setInitialData] = useState(initialDataList);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);
  const uniqueTypes = [...new Set(initialData.map((item) => item.type))];

  const handleButtonClick = (item) => {
    setInitialData((prevData) =>
      prevData.filter((data) => data.name !== item.name)
    );
    const setTargetList =
      item.type === "Fruit" ? setFruitList : setVegetableList;

    setTargetList((prev) => [...prev, item]);

    timers.current[item.name] = setTimeout(() => {
      setInitialData((prev) => [...prev, item]);
      setTargetList((prev) => prev.filter((data) => data.name !== item.name));
    }, 5000);
  };

  const moveSelectedItem = (item, from) => {
    if (from === "Fruit") {
      setFruitList((prev) => prev.filter((data) => data.name !== item.name));
    }
    if (from === "Vegetable") {
      setVegetableList((prev) =>
        prev.filter((data) => data.name !== item.name)
      );
    }

    if (timers.current(item.name)) {
      clearTimeout(timers.current(item.name));
      delete timers.current[item.name];
    }

    setInitialData((prev) => [...prev, item]);
  };

  return (
    <>
      <Flex
        justify="space-between"
        align="middle"
        className="flex-row"
        style={{ display: "flex", width: "100%" }}>
        <Card className="card-style">
          <div className="button-container">
            {initialData.map((item) => (
              <Button
                key={item.name}
                onClick={() => handleButtonClick(item, item.type)}>
                {item.name}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="card-style" title={uniqueTypes[0] || "Fruit"}>
          <div className="button-container">
            {fruitList.map((item) => (
              <button
                key={item.name}
                className="block w-full p-2 mb-1 border rounded bg-yellow-100 hover:bg-yellow-200"
                onClick={() => moveSelectedItem(item, "Fruit")}>
                {item.name}
              </button>
            ))}
          </div>
        </Card>

        <Card className="card-style" title={uniqueTypes[1] || "Vegetable"}>
          <div className="button-container">
            {vegetableList.map((item) => (
              <Button
                key={item.name}
                onClick={() => moveSelectedItem(item, "Vegetable")}>
                {item.name}
              </Button>
            ))}
          </div>
        </Card>
      </Flex>
    </>
  );
}

export default App;
