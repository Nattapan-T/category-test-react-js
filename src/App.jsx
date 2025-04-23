import "./App.css";
import { useState, useRef } from "react";
import initialDataList from "./initialDataList";
import { Card, Flex } from "antd";

function App() {
  const timers = useRef({});
  const [initialData, setInitialData] = useState(initialDataList);
  const [selectedItem, setSelectedItem] = useState({});

  const handleButtonClick = (item) => {
    setInitialData((prev) => prev.filter((data) => data.name !== item.name));

    setSelectedItem((prev) => ({
      ...prev,
      [item.name]: [...(prev(item.type) || []), item],
    }));

    timers.current[item.name] = setTimeout(() => {
      moveBackSelectedItem(item);
    }, 5000);
  };

  const moveBackSelectedItem = (item) => {
    setInitialData((prev) => [...prev, item]);

    setSelectedItem((prev) => ({
      ...prev,
      [item.type]: [
        ...(prev[item.type] || []).filter((data) => data.name !== item.name),
      ],
    }));

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

        {["fruit", "vegetable"].map((type) => {
          <Card
            className="card-style"
            title={type.charAt(0).toUpperCase() + type.slice(1)}
          >
            <div className="button-container ">
              {(selectedItem[type] || []).map((item) => (
                <button
                  key={item.id}
                  className="button-style"
                  onClick={() => moveBackSelectedItem(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Card>;
        })}
      </Flex>
    </>
  );
}
export default App;
