import { useState, forwardRef } from "react";

const Draw = ({ moveImage }, ref) => {
  const [penActive, setPenActive] = useState(false);
  const [penPosition, setPenPosition] = useState({ x: 0, y: 0 });

  return (
    <canvas
      style={{ opacity: `${moveImage ? 0 : 100}`, border: "1px solid red" }}
      width="1000"
      height="1000"
      ref={ref}
      className="drawCanvas"
      onMouseMove={(e) => {
        const ctx = ref?.current?.getContext("2d");
        if (!penActive) return;
        if (moveImage) return;
        if (ctx) {
          ctx?.beginPath();
          ctx?.moveTo(penPosition.x, penPosition.y);
          ctx?.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
          ctx?.stroke();
          setPenPosition({
            x: e.nativeEvent.offsetX,
            y: e.nativeEvent.offsetY,
          });
        }
      }}
      onMouseDown={(e) => {
        setPenPosition({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
        });
        setPenActive(true);
      }}
      onMouseOut={() => {
        setPenActive(false);
      }}
      onLoad={() => {
        const ctx = ref?.current?.getContext("2d");
        if (ctx) {
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
        }
      }}
      onMouseUp={() => {
        setPenActive(false);
      }}
    />
  );
};

export default forwardRef(Draw);
