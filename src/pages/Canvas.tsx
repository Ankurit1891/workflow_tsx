import React, { useState } from "react";
import "../App.css";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { motion } from "framer-motion";
import FlowChart from "../components/FlowChart";
import RightBar from "../components/RightBar";
import { initialNodes, initialEdges } from "../node_data/NodeData";
import { ThemeProvider } from "@fluentui/react";
import { lightTheme } from "../themes/lightTheme";
import { darkTheme } from "../themes/darkTheme";

const Canvas = (props: any) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [open, setOpen] = useState("true");

  const [xx, setXx] = useState(null);
  const [yy, setYy] = useState(null);
  const [height, setHeight] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState("white");
  const [margin, setMargin] = useState("10px");
  const [key, setKey] = useState(null);

  const onAddNode = (
    x: any,
    y: any,
    height: any,
    backgroundColor: any,
    margin: any,
    key: any
  ) => {
    setXx(x);
    setYy(y);
    setHeight(height);
    setBackgroundColor(backgroundColor);
    setMargin(margin);
    setKey(key);
  };

  const _onChange = () => {
    setIsDarkTheme((prev) => {
      return !prev;
    });
  };

  const updatedNodes = (newNodes: any) => {
    setNodes(newNodes);
  };

  return (
    <ThemeProvider
      theme={isDarkTheme ? lightTheme : darkTheme}
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
                justifyContent: "space-between",
                alignItems: 'baseline',
                fontFamily: "Segoe UI",
              }}
            >
              <h1  className="gradient-text" style={{fontSize:'30px'}}>Work Flow</h1>
              <div style={{marginRight:'20px' ,border:!isDarkTheme?'1px solid white':'1px solid black', borderRadius:'30px',padding:'4px 14px 0px'}} onClick={_onChange}>{isDarkTheme?<MdDarkMode color="#474646" size={"20px"}/>:<MdLightMode color="grey" size={"20px"}/>}</div>
            </div>
            <FlowChart
              updatedNodes={updatedNodes}
              cords={[xx, yy]}
              styles={[height, margin, backgroundColor]}
              keyId={key}
              nodes={nodes}
              edges={initialEdges}
              theme={isDarkTheme}
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
          style={{ backgroundColor: isDarkTheme ? "#ffffff" : "#000000" }}
        >
          <RightBar
            nodes={nodes}
            onAddNewNode={onAddNode}
            setOpenRightBar={setOpen}
            theme={isDarkTheme}
          ></RightBar>
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default Canvas;
