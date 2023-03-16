// import React from "react";
// import { useForm } from "react-hook-form";
// import { Input, TextArea } from "./Input";
// import {
//   Stack,
//   initializeIcons,
//   mergeStyleSets,
//   FontWeights,
//   Modal,
// } from "@fluentui/react";
// import {
//   DefaultButton,
//   PrimaryButton,
//   IconButton,
// } from "@fluentui/react/lib/Button";

// const AlterNode = ({ name, node }) => {
//   const nodeFormAcceptHandler = (data) => {
//     setOpenModal(false);
//   };

//   if (name === "input") {
//     name = "Start";
//   } else if (name === "default") {
//     name = "Continuation";
//   } else if (name === "output") {
//     name = "Finish";
//   }
//   initializeIcons();
//   const contentStyles = mergeStyleSets({
//     container: {
//       borderTop: theme ? `4px solid #0a8cfa` : "4px solid #0a8cfa",
//       borderLeft: "1px solid grey",
//       boxShadow: theme ? "5px 5px 5px #313233" : "5px 5px 5px grey",
//       display: "flex",
//       flexFlow: "column nowrap",
//       alignItems: "stretch",
//       width: "50%",
//       fontSize: "27px ",
//     },
//     header: [
//       {
//         display: "flex",
//         color: "#0d0d0d",
//         justifyContent: "space-between",
//         alignItems: "center",
//         fontWeight: FontWeights.semibold,
//         padding: "12px 12px 14px 24px",
//       },
//     ],
//     heading: {
//       color: "black",
//       fontWeight: FontWeights.semibold,
//       fontSize: "inherit",
//       margin: "0",
//     },
//     body: {
//       flex: "4 4 auto",
//       padding: "0 24px 24px 24px",
//       overflowY: "hidden",
//       selectors: {
//         p: { margin: "14px 0" },
//         "p:first-child": { marginTop: 0 },
//         "p:last-child": { marginBottom: 0 },
//       },
//     },
//   });
//   const {
//     handleSubmit,
//     watch,
//     control,
//     formState: {},
//   } = useForm({
//     mode: "all",
//   });
//   const stateName = watch("stateName");
//   const description = watch("description");
//   return (
//     <div>
//       <Modal
//         isOpen={true}
//         onDismiss={() => {
//           setOpenModal(false);
//         }}
//         isBlocking={false}
//         containerClassName={contentStyles.container}
//       >
//         <div className={contentStyles.header}>
//           <h2
//             className={contentStyles.heading}
//             style={{ color: theme ? "black" : "white" }}
//           >
//             State : {name}
//           </h2>
//           <IconButton
//             iconProps={{ iconName: "Cancel" }}
//             title="Close"
//             ariaLabel="Close"
//             onClick={() => {
//               setOpenModal(false);
//             }}
//           />
//         </div>
//         <form
//           onSubmit={handleSubmit((data) => {
//             nodeFormAcceptHandler(data);
//           })}
//         >
//           <div className={contentStyles.body}>
//             <Input
//               style={{ width: "300px" }}
//               control={control}
//               name={"stateName"}
//               label="State Name"
//               rules={{
//                 required: "This is required",
//                 minLength: { value: 3, message: "Minimun value 3" },
//                 maxLength: { value: 10, message: "Maximum val 10" },
//               }}
//               placeholder="Enter state name  here"
//             />
//             <TextArea
//               style={{ width: "600px" }}
//               control={control}
//               name={"description"}
//               label="Description"
//               rules={{
//                 required: "This is required",
//                 minLength: { value: 3, message: "Minimun value 3" },
//                 maxLength: { value: 30, message: "Maximum val 30" },
//               }}
//               placeholder="Enter description  here"
//             />
//           </div>
//           <div>
//             <Stack
//               tokens={{ childrenGap: 10 }}
//               horizontalAlign="end"
//               horizontal
//               styles={{ root: { padding: "10px" } }}
//             >
//               <DefaultButton
//                 text="CANCEL"
//                 onClick={() => {
//                   setOpenModal(false);
//                 }}
//                 allowDisabledFocus
//               />
//               <PrimaryButton
//                 type="submit"
//                 text="CONFIRM"
//                 // onClick={nodeFormAcceptHandler}
//                 allowDisabledFocus
//               />
//             </Stack>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default AlterNode;
