import React from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";
import "./OptionDialog.css";

const OptionDialog = (props: any) => {
  const onAddStartHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues("#656ac6", <VscDebugStart />, "input", "Start");
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
    <div
      className="main-box"
      style={{
        top: props.xCords - 50,
        left: props.yCords,
        backgroundColor: "#f3f2f1",
        color: "black",
      }}
    >
      <ul className="list-class">
        <motion.li
          className="list-title"
          onClick={onAddStartHandler}
          initial={{ backgroundColor: "#f3f2f1" }}
          whileHover={{ backgroundColor: "#E9E3DE" }}
        >
          Add Start
        </motion.li>
        <hr />
        <motion.li
          className="list-title"
          onClick={onAddDefaultHandler}
          initial={{ backgroundColor: "#f3f2f1" }}
          whileHover={{ backgroundColor: "#E9E3DE" }}
        >
          Add State
        </motion.li>
        <hr />
        <motion.li
          className="list-title"
          onClick={onAddTerminateHandler}
          initial={{ backgroundColor: "#f3f2f1" }}
          whileHover={{ backgroundColor: "#E9E3DE" }}
        >
          Add Finish
        </motion.li>
      </ul>
    </div>
  );
};

export default OptionDialog;
