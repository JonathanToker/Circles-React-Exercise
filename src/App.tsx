import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [elements, setElements] = useState<{ x: number; y: number }[]>([]);
  const [poppedElements, setPoppedElements] = useState<
    { x: number; y: number }[]
  >([]);
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const newDot = { x: e.clientX, y: e.clientY };
    setElements((prev) => [...prev, newDot]);
  };
  const resetCircles = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    setPoppedElements([]);
    setElements([]);
  };
  const undoLastCircle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const arrayCopy = [...elements];
    const poppedPoint = arrayCopy.pop();
    if (!poppedPoint) return;
    setPoppedElements([...poppedElements, poppedPoint]);
    setElements(arrayCopy);
  };
  const redoLastCircle = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const arrayCopy = [...elements];
    const poppedCopy = [...poppedElements];
    const poppedPoint = poppedCopy.pop();
    if (!poppedPoint) return;
    arrayCopy.push(poppedPoint);
    setElements(arrayCopy);
    setPoppedElements(poppedCopy);
  };
  return (
    <div className="App" onClick={(e) => handleClick(e)}>
      <div>
        <button
          className="button"
          onClick={(e) => resetCircles(e)}
          disabled={elements.length === 0 && poppedElements.length === 0}
        >
          Reset Circles
        </button>
        <button
          className="button"
          onClick={(e) => undoLastCircle(e)}
          disabled={elements.length === 0}
        >
          Undo
        </button>
        <button
          className="button"
          onClick={(e) => redoLastCircle(e)}
          disabled={poppedElements.length === 0}
        >
          Redo
        </button>
      </div>
      {elements
        ? elements.map((element, index) => {
            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${element.x}px`,
                  top: `${element.y}px`,
                  width: "5px",
                  height: "5px",
                  backgroundColor: "white",
                  borderRadius: "15px",
                  border: "none",
                  outline: "none",
                }}
              />
            );
          })
        : ""}
    </div>
  );
}

export default App;
