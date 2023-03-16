import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaHome } from "react-icons/fa";
import { BiAnalyse } from "react-icons/bi";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { BsFillBrushFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/analytics",
    name: "Analytics",
    icon: <BiAnalyse />,
  },
  {
    path: "/filemanager",
    name: "FileManager",
    icon: <AiTwotoneFileExclamation />,
  },
  {
    path: "/canvas",
    name: "Canvas",
    icon: <BsFillBrushFill />,
  },
];

const SideBar = ({ children }: any) => {
  const mainSectionOnClick = (e: any) => {
    setIsOpen(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen((open) => {
      return !open;
    });
  };
  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "180px" : "40px",
          padding: isOpen ? "10px" : "0px",
        }}
        className="sidebar"
      >
        <div className="top_section">
          {isOpen && <h1 className="logo_text">Yo ...</h1>}
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <motion.section className="routes">
          {routes.map((route) => (
            <motion.div
              key={route.name}
              transition={{ duration: 0.1 }}
              whileHover={
                isOpen
                  ? {
                      scale: 1.08,
                      originX: 1,
                      originY: 0,
                      color: "#f8e112",
                      width: "100%",
                    }
                  : {
                      scale: 1,
                      originX: 0,
                      originY: 0,
                      color: "#f8e112",
                      width: "93%",
                    }
              }
            >
              <NavLink to={route.path} key={route.name} className="link">
                <div className="icon" style={{}}>
                  {route.icon}
                </div>
                {isOpen && (
                  <div className="link-text" key={route.name}>
                    {route.name}
                  </div>
                )}
              </NavLink>
            </motion.div>
          ))}
        </motion.section>
      </motion.div>
      <DndProvider backend={HTML5Backend}>
        <main className="main-body-section" onClick={mainSectionOnClick}>
          {children}
        </main>
      </DndProvider>
    </div>
  );
};

export default SideBar;
