import "./App.css";
import { useState, useRef, useEffect } from "react";
import initialDataList from "./initialDataList";
import { Card, Flex } from "antd";

function App() {
  const timers = useRef({});
  const [initialData, setInitialData] = useState(initialDataList);
  const [selectedItem, setSelectedItem] = useState({});

  const handleButtonClick = (item) => {
    const typeKey = item.type.toLowerCase();
    setInitialData((prev) => prev.filter((data) => data.name !== item.name));

    setSelectedItem((prev) => ({
      ...prev,
      [typeKey]: [...(prev[typeKey] || []), item],
    }));

    timers.current[item.name] = setTimeout(() => {
      moveBackSelectedItem(item);
    }, 5000);
  };

  const moveBackSelectedItem = (item) => {
    const typeKey = item.type.toLowerCase();
    setInitialData((prev) => [...prev, item]);

    setSelectedItem((prev) => ({
      ...prev,
      [typeKey]: (prev[typeKey] || []).filter(
        (data) => data.name !== item.name
      ),
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

        {["fruit", "vegetable"].map((type) => (
          <Card
            key={type}
            className="card-style"
            title={type.charAt(0).toUpperCase() + type.slice(1)}
          >
            <div className="button-container">
              {(selectedItem[type] || []).map((item) => (
                <button
                  key={item.name}
                  className="button-style"
                  onClick={() => moveBackSelectedItem(item)}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </Card>
        ))}
      </Flex>
    </>
  );
}
export default App;
