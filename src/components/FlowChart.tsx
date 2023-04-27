/* eslint-disable array-callback-return */
import { useCallback, useRef, useState } from "react";
import { create } from "zustand";
import "reactflow/dist/style.css";
import { BsSave2 } from "react-icons/bs";
import { BsFillPrinterFill } from "react-icons/bs";
import ReactFlow, {
  Background,
  ControlButton,
  MarkerType,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  BackgroundVariant,
  Handle,
  NodeMouseHandler,
  Position,
} from "reactflow";
import ButtonEdge from "./ButtonEdge";
import "../App.css";
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import { useDrop } from "react-dnd";
import OptionDialog from "./OptionDialog";
import NodeFormModal from "./NodeFormModal";
import EdgeFormPanel from "./EdgeFormPanel";
import { useBoolean } from "@fluentui/react-hooks";
import DialogBox from "./DialogBox";
import ConditionalPanel from "./ConditionalPanel";
import ConditionalNodePanel from "./ConditionalNodePanel";
// import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";

const useMyStore = create((set) => ({
  storeNode: { initialNodes },
  setStoreNode: (newNode: any) => set({ storeNode: newNode }),
}));

const FlowChart = (props: any) => {
  const [isOpen, { setTrue: openPanel, setFalse: closePanel }] =
    useBoolean(false);

  const [
    isOpenConditional,
    { setTrue: openPanelConditional, setFalse: closePanelConditional },
  ] = useBoolean(false);
  const [nodeValues, setnodeValues] = useState({
    color: "",
    icon: {},
    type: "",
  });
  const storeNode = useMyStore((state: any) => state.storeNode);
  const setStoreNode = useMyStore((state: any) => state.setStoreNode);
  const [openDialogBox, setOpenDialogBox] = useState(false);
  const [nodeName, setnodeName] = useState("");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [selectedEdge, setSelectedEdge] = useState<any>({});
  const [selectedNode, setSelectedNode] = useState({});
  const [nodeObject, setNodeObject] = useState<any>({
    id: null,
    xCords: 0,
    yCords: 0,
    nodeKey: "",
    nodeBackgroundColor: "",
    nodeHeight: "",
    nodeMargin: "",
    nodeType: "",
    nodeIcon: "",
    nodeName: "",
    NodeDescription: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [edges, setEdges] = useState<any>(initialEdges);
  const [nodes, setNodes] = useState(initialNodes);
  const [openModal, setOpenModal] = useState(false);
  const [openEdgeFormModal, setEdgeOpenFormModal] = useState(false);
  const [openConditionalPanel, setOpenConditionalPanel] = useState(false);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    drop: (item: any, monitor: any) => {
      setNodeObject({
        xCords: nodes.length > 0 ? nodes[nodes.length - 1].position.x : 500,
        yCords: nodes.length > 0 ? nodes[nodes.length - 1].position.y : 150,
        nodeKey: item.nodeKey,
        nodeBackgroundColor: item.nodeBackgroundColor,
        nodeHeight: item.nodeHeight,
        nodeMargin: item.nodeMargin,
        nodeType: item.nodeType,
        nodeIcon: item.nodeIcon,
        nodeName: item.nodeName,
        NodeDescription: "",
      });
      assignNodeValues(
        item.nodeBackgroundColor,
        item.nodeIcon,
        item.nodeType,
        item.nodeType
      );
    },
    collect: (monitor: any): any => ({
      isOver: monitor.isOver(),
    }),
  }));

  const onAddNode = (
    keyId: any,
    backgroundColor: any,
    height: any,
    margin: any,
    icon: any,
    name: any,
    type: any,
    description: any,
    id = null,
    positionX = null,
    positionY = null
  ) => {
    const color = backgroundColor;

    switch (type) {
      case "input":
        type = "input";
        break;
      case "output":
        type = "output";
        break;
      default:
        type = "default";
        break;
    }
    const uid = id === null ? `${nodes.length}` : id === 0 ? "0" : id;
    const newNode = {
      id: uid,
      icon: icon,
      name: name,
      description: description,
      type: color === "#6ac695a7" ? "diamond" : type,
      key: `${Math.trunc(Math.random() * 500)}`,
      keyId: String(keyId),
      animated: false,
      color: color,
      style: {
        // backdropFilter: "blur(1px)",
        backgroundColor: "transparent",
        borderColor: "transparent",
        padding: color === "#27294e" ? "0px" : "7px",
        width: "fit-content",
        border: "1px solid transparent",
      },
      
      data: {
        maxOut:2,
        isSelectable: true,
        label: (
          <>
            <CustomNode
              id={uid}
              NodeIcon={icon}
              NodeDescription={description}
              Nodeheight={height}
              NodebackgroundColor={color}
              Nodemargin={margin}
              NodeName={name}
              parent={"flowchart"}
            ></CustomNode>
          </>
        ),
        style: { nodeStyle },
      },
      position: {
        x: positionX
          ? positionX
          : nodes.length > 0
          ? nodes[nodes.length - 1].position.x
          : 500,
        y: positionY
          ? positionY
          : nodes.length > 0
          ? nodes[nodes.length - 1].position.y + 100
          : 150,
      },
    };
    if (id !== 0) {
      setNodes((prevNode) => {
        const arr = [newNode, ...prevNode];
        setStoreNode(arr);
        console.log(arr);
        return [...prevNode, newNode];
      });
    } else if (nodes[0].id !== "0") {
      setNodes((prevNode) => {
        const arr = [newNode, ...prevNode];
        setStoreNode(arr);
        console.log(arr);
        return [newNode, ...prevNode];
      });
    }

    props.updatedNodes(nodes);
  };


  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds): any => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const nodeTypes = {
    diamond: (
      <div className="diamond">
        <div className="diamond__content">Diamond Node</div>
      </div>
    ),
  };

  const onDropdownChange=(val:any,id:any)=>{
    console.log(id);
    console.log(edges);
  }
  
  // onconnect the edge (adding the edge)
  const onConnect = (params: any) => {
    let type = "smoothstep";
    let dropdownData = "True";
    if (!openEdgeFormModal) {
      const { source, target } = params;
      nodes.map((node) => {
        if (node.id === source && node.description === "condition") {
          console.log(params);
          type = "buttonedge";
        }
      });
      const newEdge = {
        id: `e${source}->${target}`,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        source: source,
        target: target,
        strokeWidth: 1,
        data: {
          value: dropdownData,
          onDropdownChange: onDropdownChange,
        },
        objectModal: {
          conditionalNextState:[]
        },
        type: type,
        className: type,
        animated: false,
        labelBgStyle: { fill: "#5c59599e", backdropFilter: "blur(2px)" },
        labelStyle: {
          fill: "white",
          fontWeight: "400",
          backdropFilter: "blur(2px)",
        },

        labelShowBg: true,
        label: "",
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: "grey",
        },
      };
      setEdges([...edges, newEdge]);
      props.updatedNodes(nodes);
    }
  };

  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds: any) => applyEdgeChanges(changes, eds)),
    []
  );

  //  function on node left click

  const onNodeLeftClick = (event: any, node: any) => {
    props.updatedNodes(nodes);
    console.log(
      `Node ID:${node.id} - Node Name:${node.name} - Node Type:${node.description}`
    );
    setSelectedNode(node);
    setOpenDialog(false);
  };

  //function on edge right click

  const onEdgeRightClick = (event: any, edge: any) => {
    setSelectedNode({});
    props.updatedNodes(nodes);
    event.stopPropagation();
    event.preventDefault();
    setSelectedEdge(edge);
    nodes.map((node) => {
      if (node.id === edge.source) {
        if (node.description !== "condition") {
          openPanel();
          setEdgeOpenFormModal(true);
        } else {
          // openPanelConditional();
          // setOpenConditionalPanel(true);
        }
      }
    });
  };

  //function on making the mouse entering the edge

  const onEdgeMouseEnter = (event: any, edge: any) => {};

  //function on making the mouse leaving the edge

  const onEdgeMouseLeave = (event: any, edge: any) => {};

  // on node right click

  // mini-map node color

  const nodeColor = (node: any) => {
    return node.color === "white" ? "grey" : node.color;
  };

  const onCanvasRightClick = (e: any) => {
    setSelectedNode({});
    props.updatedNodes(nodes);
    e.preventDefault();
    setCoords({
      x: e.clientY - 30,
      y: e.clientX - 70,
    });
    setOpenDialog(true);
  };

  const onAlterNode = (text: any, desc: any) => {
    if (nodeValues.type !== "input") {
      onAddNode(
        1212,
        nodeValues.color,
        "wrap",
        "-5px",
        nodeValues.icon,
        text,
        nodeValues.type,
        desc
      );
    } else {
      onAddNode(
        1212,
        nodeValues.color,
        "wrap",
        "-5px",
        nodeValues.icon,
        text,
        nodeValues.type,
        desc,
        null
      );
    }
  };

  const removeNode = (id: any) => {
    let newNodes: any = [];
    nodes.map((node) => {
      if (node.id !== id) {
        newNodes.push(node);
      }
    });
    setNodes(newNodes);
    props.updatedNodes(nodes);
  };

  // removes node and add a new one
  const onNodeRightClick = (event: any, node: any) => {
    // setSelectedNode({});
    setSelectedNode(node);
    setOpenDialogBox(true);
    event.stopPropagation();
    event.preventDefault();
    // editNode(event, node);
  };

  const submitEditForm = (name: any, node: any) => {
    editNode(name, node);
    // console.log(name, node);
  };
  //edit node
  const editNode = (name: any, node: any) => {
    if (node.id !== "0") {
      const nodeCp = node;
      const id = node.id;
      if (name === "" || name === null) {
        name = node.name;
      }
      removeNode(node.id);
      onAddNode(
        nodeCp.keyId,
        nodeCp.color,
        nodeCp.height,
        nodeCp.margin,
        nodeCp.icon,
        name,
        nodeCp.type,
        node.description,
        id,
        node.position.x,
        node.position.y
      );
    }
  };

  const onAlterEdge = (text: any, desc: any, desc1: any, id: any) => {
    selectedEdge.label = text;
    selectedEdge.data = desc;
    selectedEdge.objectModal = desc1;
    let newEdges = [];
    edges.forEach((edge: any, index: any) => {
      if (edge.id !== id) {
        newEdges.push(edge);
      }
    });
    newEdges.push(selectedEdge);
    newEdges.sort();
    setEdges(newEdges);
  };

  const alterConditionalEdge = (text: any, data: any, data1: any, id: any) => {
    selectedEdge.label = text;
    selectedEdge.data = data;
    selectedEdge.objectModal = data1;
    let newEdges = [];
    edges.forEach((edge: any, index: any) => {
      if (edge.id !== id) {
        newEdges.push(edge);
      }
    });
    newEdges.push(selectedEdge);
    newEdges.sort();
    setEdges(newEdges);
  };

  const assignNodeValues = (color: any, icon: any, type: any, text: any) => {
    setnodeValues({ color: color, icon: icon, type: type });
    setnodeName(text);
    setOpenModal(true);
    props.updatedNodes(nodes);
  };
  // const reactFlowWrapper = useRef(null);

  const onKeyDown = (event: any) => {
    if (event.key === "Backspace") {
      // console.log("first");
      event.preventDefault();
    }
  };
  const onNodeDoubleClick: any = (event: any, node: any) => {
    setSelectedNode(node);
    props.updatedNodes(nodes);
    if (node.description === "condition") {
      openPanelConditional();
      setOpenConditionalPanel(true);
    }
    console.log("hi");
  };

  const edgeTypes: any = {
    buttonedge: ButtonEdge,
  };
const alterConditionalNode=(node:any,objectData:any)=>{
  edges.map((e:any)=>{
    if(node.id===e.target)
    {
      e.objectModal.conditionalNextState.push(objectData);
      console.log(e.id, e.source,e.target,e.objectModal);
    }
  })
}
  return (
    <div
      onKeyDown={onKeyDown}
      ref={drop}
      style={{
        position: "relative",
        width: "100%",
        padding: "5px",
        height: "100%",
        backgroundColor: props.theme ? "#e1dcdc" : "#121212",
        borderRadius: "7px",
        border: props.theme ? "1px solid black" : "1px solid grey",
      }}
    >
      {/* opens a dialog box when canvas right click is done */}
      {openDialog && (
        <OptionDialog
          theme={props.theme}
          xCords={coords.x}
          yCords={coords.y}
          assignNodeValues={assignNodeValues}
          setOpenDialog={setOpenDialog}
        ></OptionDialog>
      )}
      {openDialogBox && (
        <DialogBox
          setOpenDialogBox={setOpenDialogBox}
          submitEditForm={submitEditForm}
          node={selectedNode}
        ></DialogBox>
      )}
      {/* //Opening the form modal for edges */}

      {openEdgeFormModal && (
        <EdgeFormPanel
          alterEdge={onAlterEdge}
          edge={selectedEdge}
          isOpen={isOpen}
          dismissHandler={closePanel}
          theme={props.theme}
          setEdgeOpenFormModal={setEdgeOpenFormModal}
        />
      )}
      {openConditionalPanel && (
        // <ConditionalPanel
        //   nodes={nodes}
        //   alterConditionalEdge={alterConditionalEdge}
        //   edge={selectedEdge}
        //   isOpen={isOpenConditional}
        //   dismissHandler={closePanelConditional}
        //   theme={props.theme}
        //   setOpenConditionalPanel={setOpenConditionalPanel}
        // />
        <ConditionalNodePanel
        alterConditionalNode={alterConditionalNode}
          node={selectedNode}
          dismissHandler={closePanelConditional}
          isOpen={isOpenConditional}
          setOpenConditionalPanel={setOpenConditionalPanel}
        />
      )}

      {/* {//Opening the form modal for nodes on right click} */}
      {openModal && (
        <NodeFormModal
          name={nodeName}
          theme={props.theme}
          node={selectedNode}
          nodeData={nodeValues}
          setOpenModal={setOpenModal}
          alterNode={onAlterNode}
        />
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={false}
        onClick={(e) => {
          // setSelectedNode({});
          e.preventDefault();
          setOpenDialog(false);
          // console.log('clicked');
        }}
        onNodeDoubleClick={onNodeDoubleClick}
        onNodeClick={onNodeLeftClick}
        onNodeContextMenu={onNodeRightClick}
        onEdgeContextMenu={onEdgeRightClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onContextMenu={onCanvasRightClick}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={10}
          size={0.4}
          color={props.theme ? "black" : "white"}
        />
        <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
        <Controls
          position="top-right"
          style={{
            display: "flex",
            flexDirection: "row",
            padding: "2px",
          }}
        >
          <ControlButton
            style={{ width: "wrap-content", padding: "5px" }}
            onClick={() => {
              let jsonObj: any = {
                id: "SingleApprovalHardDeleteWorkflow",
                States: [],
              };
              let conditionalNodeArray: string[] = [];
              nodes.map((n) => {
                if (n.description === "condition") {
                  conditionalNodeArray.push(n.id);
                }
              });
              nodes.map((n) => {
                if (n.description !== "condition") {
                  let transition: any = [];
                  let stateObj: any = {
                    name: n.name,
                    Transitions: [],
                  };
                  edges.map((e: any) => {
                    let conditionalData: any[] = [];
                    if (n.id === e.source) {
                      if (conditionalNodeArray.includes(e.target)) {
                        const target = e.target;
                        edges.map((edge: any) => {
                          if (edge.source === target) {
                            conditionalData.push(edge.objectModal);
                          }
                        });
                      }
                      if (conditionalData.length !== 0) {
                        e.objectModal["ConditionalNextState"] = conditionalData;
                      } else {
                        nodes.map((n) => {
                          if (n.id === e.target) {
                            e.objectModal["ConditionalNextState"] = {
                              NextState: n.name,
                            };
                          }
                        });
                      }
                      transition.push(e.objectModal);
                    }
                    conditionalData = [];
                  });
                  stateObj.Transitions = transition;
                  jsonObj.States.push(stateObj);

                  transition = [];
                  stateObj = {
                    name: "",
                    Transitions: [],
                  };
                }
              });
              console.log(JSON.stringify(jsonObj));
            }}
          >
            <BsFillPrinterFill />
          </ControlButton>
          <ControlButton
            onClick={() => {
              edges.map((e: any) => {
                console.log(e);
              });
              nodes.map((e) => {
                console.log(e);
              });
            }}
          >
            <BsSave2 />
          </ControlButton>
        </Controls>
      </ReactFlow>
    </div>
  );
};

export default FlowChart;
