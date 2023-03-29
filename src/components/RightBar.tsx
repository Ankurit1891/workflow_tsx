// import React, { useState } from "react";
// import CustomNode from "./CustomNode";
// import { motion } from "framer-motion";
// import { nodeList } from "../node_data/RightBarNodeList";
// import { AiOutlineDoubleRight } from "react-icons/ai";
// import { AiOutlineDoubleLeft } from "react-icons/ai";

// const RightBar = (props: any) => {
//   const [openBar, setOpenBar] = useState(true);
//   const [isOpen, setisOpen] = useState(<AiOutlineDoubleRight />);
//   const [selectedNode, setSelectedNode] = useState(null);
//   let open = true;

//   const sidebarOnClickHandler = (e: any) => {
//     props.setOpenRightBar((prev: any) => {
//       open = !prev;
//       if (open) {
//         // let ctr = 0;
//         props.nodes.map((node: any) => {
//           if (node.id === "0") {
//             console.log(node);
//             return setSelectedNode(node);
//           } else {
//             setSelectedNode(null);
//           }
//         });
//       }
//       setOpenBar(open);
//       setisOpen((prev) => {
//         return open === true ? (
//           <AiOutlineDoubleRight />
//         ) : (
//           <AiOutlineDoubleLeft />
//         );
//       });
//       return !prev;
//     });
//   };

//   const onNodeAdd = (
//     x: any,
//     y: any,
//     height: any,
//     backgroundColor: any,
//     margin: any,
//     key: any
//   ) => {
//     props.onAddNewNode(x, y, height, backgroundColor, margin, key);
//   };
//   return (
//     <div style={{ display: "flex" }}>
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           width: "fit-content",
//           height: "fit-content",
//           color: "black",
//         }}
//       >
//         <motion.div
//           whileHover={{
//             scale: 1.1,
//             originX: 0,
//             originY: 0,
//           }}
//           className="sidebar-button"
//           onClick={sidebarOnClickHandler}
//         >
//           <motion.div
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             style={{
//               color: props.theme ? "#000000" : "#ffffff",
//               fontWeight: "bold",
//               fontSize: "20px",
//             }}
//           >
//             {isOpen}
//           </motion.div>
//         </motion.div>
//       </div>

//       {openBar && (
//         <div style={{ overflowY: "auto", overflowX: "hidden" }}>
//           {nodeList.map((node) => {
//             if (selectedNode === null) {
//               return (
//                 <div className="draggable-object" key={node.key}>
//                   <div>
//                     <CustomNode
//                       theme={props.theme}
//                       NodeType={node.nodeType}
//                       NodeIcon={node.nodeIcon}
//                       NodeName={node.nodeName}
//                       NodeDescription={node.nodeDescription}
//                       parent={"rightBar"}
//                       onNodeAdd={onNodeAdd}
//                       NodeKey={node.nodeID}
//                       NodeID={node.nodeID}
//                       Nodeheight={node.nodeHeight}
//                       Nodewidth={node.nodeWidth}
//                       NodebackgroundColor={node.nodeBackgroundColor}
//                       NodeborderRadius={node.nodeBorderRadius}
//                       Nodemargin={node.nodeMargin}
//                       Nodepadding={node.nodePadding}
//                     ></CustomNode>
//                   </div>
//                 </div>
//               );
//             } else {
//               if (node.nodeBackgroundColor !== "#0078d4") {
//                 return (
//                   <div className="draggable-object" key={node.key}>
//                     <div>
//                       <CustomNode
//                         theme={props.theme}
//                         NodeType={node.nodeType}
//                         NodeIcon={node.nodeIcon}
//                         NodeName={node.nodeName}
//                         NodeDescription={node.nodeDescription}
//                         parent={"rightBar"}
//                         onNodeAdd={onNodeAdd}
//                         NodeKey={node.nodeID}
//                         NodeID={node.nodeID}
//                         Nodeheight={node.nodeHeight}
//                         Nodewidth={node.nodeWidth}
//                         NodebackgroundColor={node.nodeBackgroundColor}
//                         NodeborderRadius={node.nodeBorderRadius}
//                         Nodemargin={node.nodeMargin}
//                         Nodepadding={node.nodePadding}
//                       ></CustomNode>
//                     </div>
//                   </div>
//                 );
//               }
//             }
//           })}
//         </div>
//       )}

//       {/* <button onClick={onClickHandler}>CLick</button> */}
//     </div>
//   );
// };

// export default RightBar;

import React, { useState } from "react";
import CustomNode from "./CustomNode";
import { motion } from "framer-motion";
import { nodeList } from "../node_data/RightBarNodeList";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const RightBar = (props: any) => {
  const [openBar, setOpenBar] = useState(true);
  const [isOpen, setIsOpen] = useState(<AiOutlineDoubleRight />);
  const [selectedNode, setSelectedNode] = useState(null);
  let open = true;

  const sidebarOnClickHandler = (e: any) => {
    props.setOpenRightBar((prev: any) => {
      open = !prev;
      if (open) {
        // let ctr = 0;
        props.nodes.map((node: any) => {
          if (node.id === "0") {
            console.log(node);
            return setSelectedNode(node);
          } else {
            setSelectedNode(null);
          }
        });
      }
      setOpenBar(open);
      setIsOpen((prev) => {
        return open === true ? (
          <AiOutlineDoubleRight />
        ) : (
          <AiOutlineDoubleLeft />
        );
      });
      return !prev;
    });
  };

  const onNodeAdd = (
    x: any,
    y: any,
    height: any,
    backgroundColor: any,
    margin: any,
    key: any
  ) => {
    props.onAddNewNode(x, y, height, backgroundColor, margin, key);
  };
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "fit-content",
          height: "fit-content",
          color: "black",
        }}
      >
        <motion.div
          whileHover={{
            scale: 1.1,
            originX: 0,
            originY: 0,
          }}
          className="sidebar-button"
          onClick={sidebarOnClickHandler}
        >
          <motion.div
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              color: props.theme ? "#000000" : "#ffffff",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            {isOpen}
          </motion.div>
        </motion.div>
      </div>

      {openBar && (
        <div style={{ overflowY: "auto", overflowX: "hidden" }}>
          {nodeList.map((node) => {
            if (selectedNode === null) {
              return (
                <div className="draggable-object" key={node.key}>
                  <div>
                    <CustomNode
                      theme={props.theme}
                      NodeType={node.nodeType}
                      NodeIcon={node.nodeIcon}
                      NodeName={node.nodeName}
                      NodeDescription={node.nodeDescription}
                      parent={"rightBar"}
                      onNodeAdd={onNodeAdd}
                      NodeKey={node.nodeID}
                      NodeID={node.nodeID}
                      Nodeheight={node.nodeHeight}
                      Nodewidth={node.nodeWidth}
                      NodebackgroundColor={node.nodeBackgroundColor}
                      NodeborderRadius={node.nodeBorderRadius}
                      Nodemargin={node.nodeMargin}
                      Nodepadding={node.nodePadding}
                    ></CustomNode>
                  </div>
                </div>
              );
            } else {
              if (node.nodeBackgroundColor !== "#0078d4") {
                return (
                  <div className="draggable-object" key={node.key}>
                    <div>
                      <CustomNode
                        theme={props.theme}
                        NodeType={node.nodeType}
                        NodeIcon={node.nodeIcon}
                        NodeName={node.nodeName}
                        NodeDescription={node.nodeDescription}
                        parent={"rightBar"}
                        onNodeAdd={onNodeAdd}
                        NodeKey={node.nodeID}
                        NodeID={node.nodeID}
                        Nodeheight={node.nodeHeight}
                        Nodewidth={node.nodeWidth}
                        NodebackgroundColor={node.nodeBackgroundColor}
                        NodeborderRadius={node.nodeBorderRadius}
                        Nodemargin={node.nodeMargin}
                        Nodepadding={node.nodePadding}
                      ></CustomNode>
                    </div>
                  </div>
                );
              }
            }
          })}
        </div>
      )}

      {/* <button onClick={onClickHandler}>CLick</button> */}
    </div>
  );
};

export default RightBar;
