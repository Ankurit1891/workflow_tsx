import React from "react";

import { useDrag } from "react-dnd";
import { motion } from "framer-motion";
import "../App.css";
// import { Handle, Position } from "react-flow-renderer";
import { Handle, Position } from "reactflow";
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
          ref={props.parent === "rightBar" ? drag : null}
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
                color:
                  props.NodebackgroundColor === "#CAC6C67E" && props.theme
                    ? props.parent === "rightBar"
                      ? "#000000"
                      : ""
                    : "#ffffff",
                marginRight: "10px",
                marginTop: props.parent === "rightBar" ? "-2px" : "5px",
                fontSize: props.parent === "rightBar" ? "18px" : "",
              }}
            >
              {props.NodeIcon}
            </span>
            <div
              style={{
                color:
                  props.NodebackgroundColor === "#CAC6C67E" && props.theme
                    ? "#000000"
                    : "#ffffff",
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
          ref={props.parent === "rightBar" ? drag : null}
          style={{
            zIndex: "0",
            backgroundColor: "transparent",
            transform: "rotate(0deg)",
            width: props.parent === "rightBar" ? "" : "100px",
            height: props.parent === "rightBar" ? "" : "100px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          {props.parent !== "rightBar" && (
            <div>
              <Handle
                onConnect={(params) => console.log("handle onConnect", params)}
                type="source"
                position={Position.Bottom}
                id={`${props.id}_S_B`}
                key={`${props.id}_S_B`}
                isConnectable={true}
              />
              <Handle
                onConnect={(params) => console.log("handle onConnect", params)}
                type="source"
                position={Position.Right}
                id={`${props.id}_S_R`}
                key={`${props.id}_S_R`}
                isConnectable={true}
              />
              <Handle
                onConnect={(params) => console.log("handle onConnect", params)}
                type="target"
                position={Position.Top}
                id={`${props.id}_T_T`}
                key={`${props.id}_T_T`}
                isConnectable={true}
              />
            </div>
          )}
          <motion.div
            className="rhombus"
            initial={{ rotate: 45 }}
            whileHover={{
              rotate: 45,
              scale: props.parent === "rightBar" ? 1.1 : 1,
              cursor: "pointer",
              marginTop: props.parent === "rightBar" ? "35px" : "0px",
              marginBottom: props.parent === "rightBar" ? "35px" : "0px",
            }}
            style={{
              marginLeft: props.parent === "rightBar" ? "40px" : "0px",
              marginRight: props.parent === "rightBar" ? "47px" : "0px",
              paddingLeft: props.parent === "rightBar" ? "0px" : "0px",
              marginTop: props.parent === "rightBar" ? "30px" : "-10px",
              marginBottom: props.parent === "rightBar" ? "30px" : "-10px",
              width: props.parent === "rightBar" ? "120px" : "70px",
              height: props.parent === "rightBar" ? "120px" : "70px",
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
                  color: props.theme ? "#000000" : "#ffffff",
                  marginTop: props.parent === "rightBar" ? "-2px" : "-10px",
                  marginLeft: props.parent === "rightBar" ? "25px" : "-29px",
                  fontSize: props.parent === "rightBar" ? "18px" : "",
                }}
              >
                {props.NodeIcon}
              </span>
              <span
                style={{
                  color: props.theme ? "#000000" : "#ffffff",
                  fontWeight: "600",
                  marginLeft: props.parent === "rightBar" ? "-13px" : "-30px",
                  fontSize: props.parent === "rightBar" ? "18px" : "",
                  marginTop: props.parent === "rightBar" ? "14px" : "10px",
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
