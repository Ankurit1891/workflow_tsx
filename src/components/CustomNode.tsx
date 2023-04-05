import React from "react";

import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import "../App.css";

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
      nodeBackgroundColor: props.NodebackgroundColor,
      nodeMargin: props.Nodemargin,
      nodeIcon: props.NodeIcon,
      nodeName: props.NodeName,
      nodeType: props.NodeType,
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
    <>
      {props.NodebackgroundColor !== "#27294e" ? (
        <motion.div
          ref={drag}
          key={props.key}
          whileHover={{
            scale: props.parent === "rightBar" ? 1.1 : 1,
            marginTop: props.parent === "rightBar" ? "15px" : "-5px",
            marginBottom: props.parent === "rightBar" ? "15px" : "-5px",
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
                marginTop: props.parent === "rightBar" ? "-2px" : "5px",
                fontSize: props.parent === "rightBar" ? "18px" : "",
              }}
            >
              {props.NodeIcon}
            </span>
            <div
              style={{
                color: "white",
                fontWeight: "600",
                textAlign: "left",
                marginTop: props.parent === "rightBar" ? "-3px" : "-5px",
                fontSize: props.parent === "rightBar" ? "18px" : "",
              }}
            >
              <i>{props.NodeName}</i>
            </div>
          </div>
          <br />
        </motion.div>
      ) : (
        <div
          ref={drag}
          style={{ backgroundColor: "transparent", transform: "rotate(0deg)" }}
        >
          <motion.div
            className="rhombus"
            initial={{ rotate: 45 }}
            whileHover={{
              rotate: 45,
              scale: props.parent === "rightBar" ? 1.1 : 1,
              cursor: "pointer",
              marginTop: props.parent === "rightBar" ? "35px" : "7px",
              marginBottom: props.parent === "rightBar" ? "35px" : "7px",
            }}
            style={{
              marginLeft: props.parent === "rightBar" ? "40px" : "5px",
              marginRight: props.parent === "rightBar" ? "47px" : "5px",
              paddingLeft: props.parent === "rightBar" ? "0px" : "5px",
              marginTop: props.parent === "rightBar" ? "30px" : "7px",
              marginBottom: props.parent === "rightBar" ? "30px" : "7px",
              width: props.parent === "rightBar" ? "120px" : "65px",
              height: props.parent === "rightBar" ? "120px" : "65px",
              border:
                props.parent === "rightBar" && props.theme
                  ? "1px solid black"
                  : props.parent === "rightBar" && props.theme === false
                  ? "1px solid #ffffff"
                  : "1px solid #ffffff",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                transform: "rotate(-45deg)",
              }}
            >
              <span
                style={{
                  color: "#ffffff",
                  marginTop: props.parent === "rightBar" ? "-2px" : "-10px",
                  marginLeft: props.parent === "rightBar" ? "25px" : "-33px",
                  fontSize: props.parent === "rightBar" ? "18px" : "",
                }}
              >
                {props.NodeIcon}
              </span>
              <span
                style={{
                  color: "white",
                  fontWeight: "600",
                  marginLeft: props.parent === "rightBar" ? "-13px" : "-35px",
                  fontSize: props.parent === "rightBar" ? "18px" : "",
                  marginTop: props.parent === "rightBar" ? "14px" : "",
                }}
              >
                <i>{props.NodeName}</i>
              </span>
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
        </div>
      )}
    </>
  );
};

export default CustomNode;
