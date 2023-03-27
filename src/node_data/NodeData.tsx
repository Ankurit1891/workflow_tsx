import { VscDebugStart } from "react-icons/vsc";
import React from "react";
const initialNodes = [
  {
    id: "0",
    key: "0",
    name: "start",
    type: "input",
    description: "initial state",
    color: "#656AC69F",
    style: {
      padding: "3px",
      backgroundColor: "transparent",
      border: "1px transparent",
    },
    data: {
      label: (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "wrap",
            width: "wrap",
            maxWidth: "150px",
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
    position: { x: 500, y: 150 },
  },
];
const initialEdges: any = [];

export { initialNodes, initialEdges };
