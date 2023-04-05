import { VscDebugStart } from "react-icons/vsc";
import React from "react";
const initialNodes = [
  {
    id: "0",
    key: "0",
    name: "start",
    type: "input",
    description: "start",
    color: "#656AC69F",
    style: {
      padding: "3px",
      backgroundColor: "transparent",
      border: "1px transparent",
      width: "145px",
    },
    data: {
      isSelectable: false,
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "55px",
            width: "wrap",
            minWidth: "138px",
            maxWidth: "138px",
            border: "1px solid white",
            backgroundColor: "#656AC69F",
            borderRadius: "5px",
            margin: "0px",
            padding: "10px",
            paddingBottom: "7px",
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
              <VscDebugStart />
            </span>
            <div
              style={{ color: "white", fontWeight: "600", textAlign: "left" }}
            >
              <i>START</i>
            </div>
          </div>
          <br />
          <div style={{ textAlign: "left" }}>
            <span
              style={{
                color: "white",
                fontWeight: "300",
                textAlign: "left",
                fontSize: "9px",
              }}
            ></span>
          </div>
        </div>
      ),
    },
    position: { x: 400, y: 150 },
  },
];
const initialEdges: any = [];

export { initialNodes, initialEdges };
