import React from "react";
import { motion } from "framer-motion";
import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";
import "./OptionDialog.css";
import {
  AbButton,
  AbMenu,
  AbMenuList,
  AbMenuListItem,
  AbMenuTrigger,
} from "@surya-soft/surya-ab-reactui";
const OptionDialog = (props: any) => {
  const onAddStartHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues("#656ac6", <VscDebugStart />, "input", "Start");
  };

  const onAddDefaultHandler = () => {
    props.setOpenDialog((val: any) => !val);
    props.assignNodeValues(
      "#5c59599e",
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
    // <div
    //   className="main-box"
    //   style={{
    //     top: props.xCords - 50,
    //     left: props.yCords,
    //   }}
    // >
    //   <ul className="list-class">
    //     <motion.li
    //       initial={{ fontWeight: 100 }} // Set initial font weight to 400
    //       animate={{ fontWeight: 400 }} // Set animate font weight to 700
    //       transition={{ duration: 0.1 }}
    //       whileHover={{
    //         scale: 1.1,
    //         originX: 0,
    //       }}
    //       className="list-title"
    //       onClick={onAddStartHandler}
    //     >
    //       Add Start
    //     </motion.li>
    //     <hr />
    //     <motion.li
    //       initial={{ fontWeight: 100 }} // Set initial font weight to 400
    //       animate={{ fontWeight: 400 }} // Set animate font weight to 700
    //       transition={{ duration: 0.1 }}
    //       whileHover={{
    //         scale: 1.1,
    //         originX: 0,
    //       }}
    //       className="list-title"
    //       onClick={onAddDefaultHandler}
    //     >
    //       Add State
    //     </motion.li>
    //     <hr />
    //     <motion.li
    //       initial={{ fontWeight: 100 }} // Set initial font weight to 400
    //       animate={{ fontWeight: 400 }} // Set animate font weight to 700
    //       transition={{ duration: 0.1 }}
    //       whileHover={{
    //         scale: 1.1,
    //         originX: 0,
    //       }}
    //       className="list-title"
    //       onClick={onAddTerminateHandler}
    //     >
    //       Add Finish
    //     </motion.li>
    //   </ul>
    // </div>
    <AbMenu>
      <AbMenuTrigger>
        <AbButton variant="Primary">Click me</AbButton>
      </AbMenuTrigger>
      <AbMenuList>
        <AbMenuListItem onClick={onAddStartHandler}>Add Start</AbMenuListItem>
        <AbMenuListItem onClick={onAddDefaultHandler}>Add State</AbMenuListItem>
        <AbMenuListItem onClick={onAddTerminateHandler}>
          Add Finish
        </AbMenuListItem>
      </AbMenuList>
    </AbMenu>
  );
};

export default OptionDialog;
