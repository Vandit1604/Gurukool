import { useState } from "react";

const useColor = () => {
  const [color, updatecolor] = useState("");
  function GenColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    updatecolor(color);
  }
  return { GenColor, color };
};
export default useColor;
