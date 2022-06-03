import { useState, useRef, useEffect } from "react";
import "./App.css";
import Draw from "./Draw";
import shiftDrawing from "./shiftDrawing";
const App = () => {
  const ref = useRef(null);
  const [startPosition, setStartPosition] = useState({});
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [move, setMove] = useState(false);
  const [image, setImage] = useState(false);
  const [moveImage, setMoveImage] = useState(false);
  const [penSize, setPenSize] = useState(10);
  const [erase, setErase] = useState(false);

  useEffect(() => {
    const ctx = ref?.current?.getContext("2d");
    if (ctx) {
      ctx.globalCompositeOperation = erase ? "destination-out" : "source-over";
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = penSize * 2;
      ctx.strokeStyle = "red";
    }
  }, [penSize, erase]);

  useEffect(() => {
    if (!moveImage) {
      shiftDrawing(ref, -offset.x, -offset.y);
    } else {
      setImage(ref.current.toDataURL());
      setOffset({ x: 0, y: 0 });
    }
  }, [moveImage]);

  return (
    <div>
      <button
        onClick={() => {
          setErase(!erase);
        }}
      >
        Toggle Erase
      </button>
      <button
        onClick={() => {
          setPenSize(penSize < 50 ? 50 : penSize - 3);
        }}
      >
        +
      </button>
      <button
        onClick={() => {
          setPenSize(penSize < 0 ? 0 : penSize - 3);
        }}
      >
        -
      </button>

      <button
        onClick={() => {
          setMoveImage(!moveImage);
        }}
      >
        {`${moveImage ? "Moving" : "Painting"} Mode`}
      </button>
      <br />
      <div className="outer">
        <Draw ref={ref} moveImage={moveImage} />
        {moveImage && (
          <div
            className="imageMover"
            style={{
              background: `url("${image}")`,
              backgroundPosition: `right ${offset.x}px bottom ${offset.y}px`,
            }}
            onClick={() => {}}
            onMouseMove={(e) => {
              if (!move) return;
              setOffset({
                x: (startPosition.x - e.nativeEvent.offsetX) % 1000,
                y: (startPosition.y - e.nativeEvent.offsetY) % 1000,
              });
            }}
            onMouseDown={(e) => {
              setStartPosition({
                x: (e.nativeEvent.offsetX + offset.x) % 1000,
                y: (e.nativeEvent.offsetY + offset.y) % 1000,
              });
              setMove(true);
            }}
            onMouseOut={(e) => {
              setMove(false);
            }}
            onMouseUp={(e) => {
              setMove(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
