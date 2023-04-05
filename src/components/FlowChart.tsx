/* eslint-disable array-callback-return */
import { useCallback, useRef, useState } from "react";
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
} from "reactflow";

import "../App.css";
import { nodeStyle } from "../node_data/RightBarNodeList";
import { initialEdges, initialNodes } from "../node_data/NodeData";
import CustomNode from "./CustomNode";
import { useDrop } from "react-dnd";
import OptionDialog from "./OptionDialog";
import NodeFormModal from "./NodeFormModal";
import EdgeFormPanel from "./EdgeFormPanel";
import { useBoolean } from "@fluentui/react-hooks";
import Panel from "./Panel";
import DialogBox from "./DialogBox";

const FlowChart = (props: any) => {
  const [isOpen, { setTrue: openPanel, setFalse: closePanel }] =
    useBoolean(false);
  const [nodeValues, setnodeValues] = useState({
    color: "",
    icon: {},
    type: "",
  });
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

    const newNode = {
      id: id === null ? `${nodes.length}` : id === 0 ? "0" : id,
      icon: icon,
      name: name,
      description: description,
      type: color === "#6ac695a7" ? "diamond" : type,
      key: `${Math.trunc(Math.random() * 500)}`,
      keyId: String(keyId),
      animated: false,
      color: color,
      style: {
        backgroundColor: "transparent",
        borderColor: "transparent",
        padding: "8px",
        width: "fit-content",
        border: "1px solid transparent",
      },
      data: {
        isSelectable: true,
        label: (
          <>
            <CustomNode
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
        return [...prevNode, newNode];
      });
    } else if (nodes[0].id !== "0") {
      setNodes((prevNode) => {
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

  // onconnect the edge (adding the edge)

  const onConnect = (params: any) => {
    if (!openEdgeFormModal) {
      const { source, target } = params;
      const newEdge = {
        id: `e${source}->${target}`,
        source: source,
        target: target,
        strokeWidth: 1,
        data: "",
        type: "smoothstep",
        className: "smoothstep",
        animated: false,
        // orient: "auto",
        labelBgStyle: { fill: "#5c59599e" },
        labelStyle: {
          fill: "white",
          fontWeight: "400",
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
    setOpenDialog(false);
  };

  //function on edge right click

  const onEdgeRightClick = (event: any, edge: any) => {
    props.updatedNodes(nodes);
    event.stopPropagation();
    event.preventDefault();
    setSelectedEdge(edge);
    nodes.map((node) => {
      if (node.id === edge.source) {
        if (node.description !== "condition") {
          openPanel();
          setEdgeOpenFormModal(true);
        }
      }
    });
    //TODO: print the source node

    // openPanel();
    // setEdgeOpenFormModal(true);

    // setIsPanelOpen(true);
  };

  //function on making the mouse entering the edge

  const onEdgeMouseEnter = (event: any, edge: any) => {};

  //function on making the mouse leaving the edge

  const onEdgeMouseLeave = (event: any, edge: any) => {};

  // on node right click

  // mini-map node colour

  const nodeColor = (node: any) => {
    return node.color === "white" ? "grey" : node.color;
  };

  const onCanvasRightClick = (e: any) => {
    props.updatedNodes(nodes);
    e.preventDefault();
    setCoords({
      x: e.clientY - 30,
      y: e.clientX - 70,
    });
    setOpenDialog(true);
  };

  const onAlterNode = (text: any, desc: any) => {
    if (nodeValues.color !== "#656ac6") {
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
    setSelectedNode(node);
    setOpenDialogBox(true);
    event.stopPropagation();
    event.preventDefault();
    // editNode(event, node);
  };

  const submitEditForm = (name: any, node: any) => {
    editNode(name, node);
    console.log(name, node);
  };
  //edit node
  const editNode = (name: any, node: any) => {
    if (node.id !== "0") {
      const nodeCp = node;
      const id = node.id;
      if (name === "" || name === null) {
        name = node.name;
      }
      const desc = "";
      removeNode(node.id);
      onAddNode(
        nodeCp.keyId,
        nodeCp.color,
        nodeCp.height,
        nodeCp.margin,
        nodeCp.icon,
        name,
        nodeCp.type,
        desc,
        id,
        node.position.x,
        node.position.y
      );
    }
  };

  const onAlterEdge = (text: any, desc: any, id: any) => {
    selectedEdge.label = text;
    selectedEdge.data = desc;
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
  const reactFlowWrapper = useRef(null);

  const onKeyDown = (event: any) => {
    if (event.key === "Backspace") {
      console.log("first");
      event.preventDefault();
    }
  };

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
        // <Panel
        //   alterEdge={onAlterEdge}
        //   edge={selectedEdge}
        //   isOpen={isOpen}
        //   dismissHandler={closePanel}
        //   theme={props.theme}
        //   setEdgeOpenFormModal={setEdgeOpenFormModal}
        // />
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
        ref={reactFlowWrapper}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        snapToGrid={false}
        onClick={() => {
          setOpenDialog(false);
        }}
        onNodeClick={onNodeLeftClick}
        onNodeContextMenu={onNodeRightClick}
        onEdgeContextMenu={onEdgeRightClick}
        onEdgeMouseEnter={onEdgeMouseEnter}
        onEdgeMouseLeave={onEdgeMouseLeave}
        onContextMenu={onCanvasRightClick}
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

              nodes.map((n) => {
                let transition: any = [];
                let stateObj: any = {
                  name: n.name,
                  Transitions: [],
                };
                edges.map((e: any) => {
                  if (n.id === e.source) {
                    transition.push(e.data);
                  }
                });
                stateObj.Transitions = transition;
                transition = [];
                jsonObj.States.push(stateObj);
                stateObj = {
                  name: "",
                  Transitions: [],
                };
              });
              console.log(JSON.stringify(jsonObj));
            }}
          >
            <BsFillPrinterFill />
          </ControlButton>
          <ControlButton
            onClick={() => {
              // exportFlowchart();
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
