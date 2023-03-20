import React from "react";

import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import "../App.css";
interface props {
  NodeKey: String;
  NodeID: String;
  Nodeheight: String;
  Nodemargin: String;
  NodeName: String;
  NodeIcon: Object;
  theme: boolean;
  parent: String;
  key: number;
  NodebackgroundColor: String;
}
const CustomNode = (props: any) => {
  const x = Math.trunc(Math.random() * 500);
  const y = Math.trunc(Math.random() * 50);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: {
      id: props.NodeID,
      x: x,
      y: y,
      nodeKey: props.NodeKey,
      nodeHeight: props.Nodeheight,
      nodeBackgroundColor: props.Nodeheight,
      nodeMargin: props.Nodemargin,
      nodeIcon: props.NodeIcon,
      nodeName: props.NodeName,
      nodeType: props.NodeName,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  let border = "";
  if (isDragging === true && props.theme === true) {
    border = "5px solid black";
  } else if (isDragging === true && props.theme === false) {
    border = "5px solid white";
  } else if (isDragging === false && props.theme === true) {
    border = "1px solid black";
  } else {
    border = "1px solid white";
  }
  return (
    <motion.div
      ref={drag}
      key={props.key}
      whileHover={{
        scale: props.parent === "rightBar" ? 1.1 : 1,
      }}
      className="custom-node"
      style={{
        opacity: isDragging ? "0.3" : "1",
        cursor: isDragging ? "grabbing" : "grab",
        display: "flex",
        flexDirection: "column",
        height: props.parent === "rightBar" ? "100px" : "55px",
        width: props.parent === "rightBar" ? "180px" : "fit-content",
        minWidth: "138px",
        border: border,
        backgroundColor: props.NodebackgroundColor,
        borderRadius: isDragging ? "0px" : "5px",
        margin: props.parent === "rightBar" ? props.Nodemargin : "-5px",
        padding: props.parent === "rightBar" ? "15px" : "10px",
        paddingBottom: props.parent === "rightBar" ? "15px" : "7px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "row" }}>
        <span
          style={{
            color: "white",
            marginRight: "10px",
            marginTop: "-2px",
          }}
        >
          {props.NodeIcon}
        </span>
        <div style={{ color: "white", fontWeight: "600", textAlign: "left" }}>
          <i>{props.NodeName}</i>
        </div>
      </div>
      <br />
      <div style={{ textAlign: "left" }}>
        <span
          style={{
            color: "white",
            fontWeight: "300",
            textAlign: "left",
            fontSize: props.parent === "rightBar" ? "15px" : "9px",
          }}
        ></span>
      </div>
    </motion.div>
  );
};

export default CustomNode;
