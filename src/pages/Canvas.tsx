import React, { useState } from "react";
import "../App.css";

import { motion } from "framer-motion";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";
import { Toggle } from "@fluentui/react/lib/Toggle";
import { initialNodes, initialEdges } from "../node_data/NodeData";
import { ThemeProvider } from "@fluentui/react";
import { lightTheme } from "../themes/lightTheme";
import { darkTheme } from "../themes/darkTheme";

const Canvas = (props: any) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [isdarkTheme, setIsDarkTheme] = useState(true);
  const [open, setOpen] = useState("true");

  const [xx, setxx] = useState(null);
  const [yy, setyy] = useState(null);
  const [height, setheight] = useState(null);
  const [backgroundColor, setbackgroundColor] = useState("white");
  const [margin, setmargin] = useState("10px");
  const [key, setkey] = useState(null);

  const onAddNode = (
    x: any,
    y: any,
    height: any,
    backgroundColor: any,
    margin: any,
    key: any
  ) => {
    setxx(x);
    setyy(y);
    setheight(height);
    setbackgroundColor(backgroundColor);
    setmargin(margin);
    setkey(key);
  };

  const _onChange = (ev: any) => {
    setIsDarkTheme((prev) => {
      return !prev;
    });
  };

  const updatedNodes = (newNodes: any) => {
    setNodes(newNodes);
  };

  return (
    <ThemeProvider
      theme={isdarkTheme ? lightTheme : darkTheme}
      style={{ height: "100vh" }}
    >
      <div className="canvas-class">
        <motion.div
          animate={{
            width: open ? "80%" : "94%",
          }}
          className="canvas"
        >
          <div
            style={{
              height: "93%",
            }}
          >
            <div
              style={{
                height: "50px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Toggle style={{ padding: "2px" }} onChange={_onChange} />
            </div>
            <FlowChart
              updatedNodes={updatedNodes}
              cords={[xx, yy]}
              styles={[height, margin, backgroundColor]}
              keyId={key}
              nodes={nodes}
              edges={initialEdges}
              theme={isdarkTheme}
            ></FlowChart>
          </div>
        </motion.div>
        <motion.div
          animate={{
            height: open ? "100%" : "50px",
            width: open ? "250px" : "50px",
          }}
          transition={{
            type: "inirtia",

            duration: "0.3",
          }}
          className="right-bar"
          style={{ backgroundColor: isdarkTheme ? "#ffffff" : "#000000" }}
        >
          <RightBar
            nodes={nodes}
            onAddNewNode={onAddNode}
            setOpenRightBar={setOpen}
            theme={isdarkTheme}
          ></RightBar>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default Canvas;
