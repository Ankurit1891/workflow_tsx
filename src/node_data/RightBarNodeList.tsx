import { VscDebugStart } from "react-icons/vsc";
import { SiMobxstatetree } from "react-icons/si";
import { GoCircleSlash } from "react-icons/go";

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
    nodeBackgroundColor: "#656ac6",
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
    // nodeBackgroundColor: "#208d7c",
    nodeBackgroundColor: "#5c59599e",

    nodeBorderRadius: "10px",
    nodeMargin: "10px",
    nodePadding: "20px",
    nodeDescription: "Add state",
    nodeName: "STATE",
    nodeType: "default",
  },
  // {
  //   key: "type3",
  //   nodeID: "type3",
  //   nodeIcon: <AiTwotonePushpin />,
  //   nodeHeight: "100px",
  //   nodeWidth: "fit-content",
  //   nodeBackgroundColor: "#27294e",
  //   nodeBorderRadius: "10px",
  //   nodeMargin: "10px",
  //   nodePadding: "20px",
  //   nodeDescription: "Add Plugin",
  //   nodeName: "ADD PLUGIN",
  //   nodeType: "default",
  // },
  // {
  //   key: "type4",
  //   nodeID: "type4",
  //   nodeIcon: <IoMail />,
  //   nodeHeight: "100px",
  //   nodeWidth: "fit-content",
  //   nodeBackgroundColor: "#02b028",
  //   nodeBorderRadius: "10px",
  //   nodeMargin: "10px",
  //   nodePadding: "20px",
  //   nodeDescription: "Send mail",
  //   nodeName: "MAIL",
  //   nodeType: "default",
  // },
  // {
  //   key: "type5",
  //   nodeID: "type5",
  //   nodeIcon: <GoVerified />,
  //   nodeHeight: "100px",
  //   nodeWidth: "fit-content",
  //   nodeBackgroundColor: "#0d0096",
  //   nodeBorderRadius: "10px",
  //   nodeMargin: "10px",
  //   nodePadding: "20px",
  //   nodeDescription: "Get verification done",
  //   nodeName: "VERIFICATION",
  //   nodeType: "default",
  // },
  // {
  //   key: "type6",
  //   nodeID: "type6",
  //   nodeIcon: <HiOutlineLightningBolt />,
  //   nodeHeight: "100px",
  //   nodeWidth: "fit-content",
  //   nodeBackgroundColor: "#b3a100",
  //   nodeBorderRadius: "10px",
  //   nodeMargin: "10px",
  //   nodePadding: "20px",
  //   nodeDescription: "Make a HTTP request",
  //   nodeName: "HTTP REQUEST",
  //   nodeType: "default",
  // },
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