import "./App.css";
import { useState, useRef } from "react";
import initialDataList from "./initialDataList";
import { Card, Flex } from "antd";

function App() {
  const timers = useRef({});
  const [initialData, setInitialData] = useState(initialDataList);
  const [fruitList, setFruitList] = useState([]);
  const [vegetableList, setVegetableList] = useState([]);

  const handleButtonClick = (item) => {
    setInitialData((prevData) =>
      prevData.filter((data) => data.name !== item.name)
    );

    const selectedItemList =
      item.type.toLowerCase() === "fruit" ? setFruitList : setVegetableList;
    selectedItemList((prevList) => [...prevList, item]);

    timers.current[item.name] = setTimeout(() => {
      setInitialData((prev) => [...prev, item]);
      selectedItemList((prevList) =>
        prevList.filter((data) => data.name !== item.name)
      );
    }, 5000);
  };

  const moveBackSelectedItem = (item, from) => {
    setInitialData((prev) => [...prev, item]);

    if (from === "fruit") {
      setFruitList((prevList) =>
        prevList.filter((data) => data.name !== item.name)
      );
    } else if (from === "vegetable") {
      setVegetableList((prevList) =>
        prevList.filter((data) => data.name !== item.name)
      );
    }

    if (timers.current[item.name]) {
      clearTimeout(timers.current[item.name]);
      delete timers.current[item.name];
    }
  };

  return (
    <>
      <Flex className="container">
        <Card className="card-style">
          <div className="button-container">
            {initialData.map((item) => (
              <button
                key={item.name}
                className="button-style"
                onClick={() => handleButtonClick(item)}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Card>

        <Card className="card-style" title="Fruit">
          <div className="button-container ">
            {fruitList.map((item) => (
              <button
                key={item.id}
                className="button-style"
                onClick={() => moveBackSelectedItem(item, "fruit")}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Card>

        <Card className="card-style" title="Vegetable">
          <div className="button-container ">
            {vegetableList.map((item) => (
              <button
                key={item.id}
                className="button-style"
                onClick={() => moveBackSelectedItem(item, "vegetable")}
              >
                {item.name}
              </button>
            ))}
          </div>
        </Card>
      </Flex>
    </>
  );
}
export default App;
