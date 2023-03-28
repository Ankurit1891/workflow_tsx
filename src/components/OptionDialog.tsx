import React from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";
import "./OptionDialog.css";

const OptionDialog = (props: any) => {
  const listTitleStyle: any = {
    paddingLeft: "30px",
    paddingBottom: "10px",
    paddingTop: "10px",
    color: props.theme ? "#252424e6" : "#FFFFFFDC",
    fontSize: "14px",
    cursor: "pointer",
    marginBottom: "1px",
  };

  const mainBoxStyle: any = {
    top: props.xCords - 50,
    left: props.yCords,
    backgroundColor: props.theme ? "#f3f2f1" : "#000000",
    position: "absolute",
    zIndex: "200",
    borderRadius: "2px",
    listStyle: "none",
    width: "200px",
    boxShadow: props.theme
      ? "1px 1px 4px -1px #252424"
      : "1px 1px 4px -1px #FFFFFF",
    height: "fit-content",
  };

  const onAddStartHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues("#656AC69F", <VscDebugStart />, "input", "Start");
  };

  const onAddDefaultHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues(
      "#63616142",
      <SiMobxstatetree />,
      "default",
      "Continuation"
    );
  };

  const onAddTerminateHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues("#000000", <GoCircleSlash />, "output", "Finish");
  };
  return (
    <div className="main-box" style={mainBoxStyle}>
      <ul className="list-class">
        <motion.li
          className="list-title"
          onClick={onAddStartHandler}
          initial={{ backgroundColor: props.theme ? "#f3f2f1" : "#000000" }}
          whileHover={{ backgroundColor: props.theme ? "#E9E3DE" : "#141414" }}
          style={listTitleStyle}
        >
          Add Start
        </motion.li>
        <hr
          style={{
            color: "rgb(169, 171, 173)",
            opacity: "0.25",
            margin: "0px",
            border: "0",
            borderTop: "var(--bs-border-width) solid",
          }}
        />
        <motion.li
          className="list-title"
          onClick={onAddDefaultHandler}
          initial={{ backgroundColor: props.theme ? "#f3f2f1" : "#000000" }}
          whileHover={{ backgroundColor: props.theme ? "#E9E3DE" : "#141414" }}
          style={listTitleStyle}
        >
          Add State
        </motion.li>
        <hr
          style={{
            color: "rgb(169, 171, 173)",
            opacity: "0.25",
            margin: "0px",
            border: "0",
            borderTop: "var(--bs-border-width) solid",
          }}
        />
        <motion.li
          className="list-title"
          onClick={onAddTerminateHandler}
          initial={{ backgroundColor: props.theme ? "#f3f2f1" : "#000000" }}
          whileHover={{ backgroundColor: props.theme ? "#E9E3DE" : "#141414" }}
          style={listTitleStyle}
        >
          Add Finish
        </motion.li>
      </ul>
    </div>
  );
};

export default OptionDialog;
