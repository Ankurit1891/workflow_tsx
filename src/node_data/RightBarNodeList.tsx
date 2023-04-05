import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";
import { GiAntibody } from "react-icons/gi";



const nodeStyle = {
  background: "transparent",
  color: "#DA5454",
  width: 100,
  height: 50,
  padding: "7px",
  margin: 0,
  border: "2px solid #000000",
  boxShadow: "3px 3px 3px #888888",
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
  fontSize: 16,
  fontWeight: "bold",
  textTransform: "uppercase",
  lineHeight: 1.2,
};
const nodeList = [
  {
    key: "type1",
    nodeID: "type1",
    nodeIcon: <VscDebugStart />,
    nodeHeight: "100px",
    nodeWidth: "fit-content",
    nodeBackgroundColor: "#656AC69F",
    nodeBorderRadius: "10px",
    nodeMargin: "10px",
    nodePadding: "20px",
    nodeDescription: "Start work-flow",
    nodeName: "START",
    nodeType: "input",
  },
  {
    key: "type2",
    nodeID: "type2",
    nodeIcon: <SiMobxstatetree />,
    nodeHeight: "100px",
    nodeWidth: "fit-content",
    nodeBackgroundColor: "#5c59599e",
    nodeBorderRadius: "10px",
    nodeMargin: "10px",
    nodePadding: "20px",
    nodeDescription: "Add state",
    nodeName: "STATE",
    nodeType: "default",
  },
  {
    key: "type3",
    nodeID: "type3",
    nodeIcon: <GiAntibody color="#ffffff"/>,
    nodeHeight: "100px",
    nodeWidth: "fit-content",
    nodeBackgroundColor: "#27294e",
    nodeBorderRadius: "10px",
    nodeMargin: "10px",
    nodePadding: "20px",
    nodeDescription: "Add Condition",
    nodeName: "CONDITION",
    nodeType: "condition",
  },
  {
    key: "type7",
    nodeID: "type7",
    nodeIcon: <GoCircleSlash />,
    nodeHeight: "100px",
    nodeWidth: "fit-content",
    nodeBackgroundColor: "#000000",
    nodeBorderRadius: "10px",
    nodeMargin: "10px",
    nodePadding: "20px",
    nodeDescription: "End workflow",
    nodeName: "FINISH",
    nodeType: "output",
  },
];

export { nodeList, nodeStyle };
