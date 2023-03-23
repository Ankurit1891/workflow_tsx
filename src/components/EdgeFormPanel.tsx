/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@fluentui/react";
// import event_code from "../api_data/event_code";
import { useForm } from "react-hook-form";

import {
  AbButton,
  AbDarkTheme,
  AbInput,
  AbInputTypes,
  AbPanel,
  AbPanelBody,
  AbPanelHeader,
  AbSelect,
  AbSelectOption,
  AbStack,
  AbStepper,
  AbStepperStep,
} from "@surya-soft/surya-ab-reactui";

const EdgeFormPanel = (props: any) => {
  const [conditionalOrder, setConditionalOrder] = useState<any>({
    actionType: 0,
    input: "",
  });

  /// TEXT INPUT FIELD   -- LAST FIELD
  const [transitionName, setTransitionName] = useState<any>("");
  const [preTransitionData, setPreTransitionData] = useState<any>("");
  const [postTransitionData, setPostTransitionData] = useState<any>("");
  const [conditionNextStateData, setConditionNextStateData] = useState<any>("");

  // system event code drop down list
  const [systemCodeData, setSystemCodeData] = useState<any>([]);

  // system event code change handler
  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState();

  // primary Drop Down List
  const [preTransitionDropDownList, setPreTransitionDropDownList]: any =
    useState([]);
  const [postTransitionDropDownList, setPostTransitionDropDownList]: any =
    useState([]);
  const [
    conditionalNextStateDropDownList,
    setConditionalNextStateDropDownList,
  ]: any = useState([]);

  // primary drop down handler
  const [preTransitionActionType, setPreTransitionActionType] = useState({
    actionType: 0,
    input: "",
  });
  const [postTransitionActionType, setPostTransitionActionType] = useState({
    actionType: 0,
    input: "",
  });
  const [conditionalNextStateType, setConditionalNextStateType] = useState({
    actionType: 0,
    input: "",
  });

  // secondary drop down handler
  const [preTransitionActionTypeData, setPreTransitionActionTypeData] =
    useState({
      actionType: 0,
      input: "",
    });
  const [postTransitionActionTypeData, setPostTransitionActionTypeData] =
    useState({
      actionType: 0,
      input: 0,
    });
  const [conditionalNextStateTypeData, setConditionalNextStateTypeData] =
    useState({
      actionType: "",
      input: "",
    });

  // secondary drop down list
  const [
    preTransitionActionDropDownList,
    setPreTransitionActionDropDownList,
  ]: any = useState([]);
  const [
    postTransitionActionDropDownList,
    setPostTransitionActionDropDownList,
  ]: any = useState([]);
  const [order, setOrder]: any = useState([]);
  const [active, setActive] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {},
  } = useForm<any>({
    mode: "all",
  });

  const onChangeSystemEventCodeHandler = (e: any, option: any) => {
    setOnChangeSystemEventCode(option.text);
  };
  const onChangePreTransitionHandler = (e: any, option: any) => {
    let key = option.key;
    const url = `/api/pre_transcition_action/${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPreTransitionActionDropDownList(json.data);
      });
    setPreTransitionActionType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangePostTransitionHandler = (e: any, option: any) => {
    let key = option.key;
    const url = `/api/post_transcition_action/${key}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setPostTransitionActionDropDownList(json.data);
      });
    setPostTransitionActionType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangeConditionalNextState = (e: any, option: any) => {
    // let key = option.key;
    // const url = `/api/pre_transcition_action/${key}`;
    // fetch(url)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     setPreTransitionActionDropDownList(json.data);
    //   });
    setConditionalNextStateType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
    const url1 = `/api/conditional_next_state/order`;
    fetch(url1)
      .then((res) => res.json())
      .then((json) => {
        setOrder(json.data);
      });
    // setConditionalNextStateType((prev) => ({
    //   actionType: option.key,
    //   input: option.text,
    // }));
  };

  const onChangePreTransitionActionTypeData = (e: any, option: any) => {
    setPreTransitionActionTypeData((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangePostTransitionActionTypeData = (e: any, option: any) => {
    setPostTransitionActionTypeData((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangeConditionalNextStateData = (e: any, option: any) => {
    console.log(option);
    setConditionalNextStateTypeData((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onChangeConditionalOrder = (e: any, option: any) => {
    setConditionalOrder(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  useEffect(() => {
    fetch("/api/event_code")
      .then((res) => res.json())
      .then((json) => {
        setSystemCodeData(json.codes);
      });
  }, []);

  useEffect(() => {
    fetch("/api/pre_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPreTransitionDropDownList(json.data);
      });
  }, []);

  useEffect(() => {
    fetch("/api/post_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPostTransitionDropDownList(json.data);
      });
  }, []);
  useEffect(() => {
    fetch("/api/conditional_next_state")
      .then((res) => res.json())
      .then((json) => {
        setConditionalNextStateDropDownList(json.data);
      });
  }, []);
  const dismiss = (): any => {
    props.setEdgeOpenFormModal(false);
    return props.dismissHandler;
  };
  const widthStyle = {
    width: 400,
  };
  const widthStyleLabel = {
    maxWidth: "400px",
  };

  return (
    <ThemeProvider theme={AbDarkTheme}>
      <AbPanel
        isOpen={props.isOpen}
        placement={"right"}
        onDismiss={dismiss}
        size="L"
        modalLike={true}
      >
        <AbPanelHeader>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Transition
          </span>
        </AbPanelHeader>
        <AbPanelBody>
          <AbStepper
            size="small"
            showStepNumbers={false}
            activeIndex={active}
            onStepClick={setActive}
            orientation="vertical"
          >
            <AbStepperStep label="Transition Name">
              <AbStack style={widthStyleLabel}>
                <AbInput
                  value={transitionName}
                  required={true}
                  label="Transition Name"
                  onChange={(e, newValue: any): any => {
                    setTransitionName(newValue);
                  }}
                  type={AbInputTypes.Text}
                />
              </AbStack>
              <AbSelect
                label="System Event Code"
                onBlur={function noRefCheck() {}}
                onChange={onChangeSystemEventCodeHandler}
                placeholder="Select one option"
                style={widthStyle}
              >
                {systemCodeData.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.actionType}>
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>
              <AbButton
                onClick={function noRefCheck() {
                  setActive(1);
                }}
                variant="Primary"
                style={{
                  marginTop: "10px",
                }}
              >
                Next
              </AbButton>
            </AbStepperStep>
            <AbStepperStep label="Pre-Transition Action">
              <AbSelect
                key={"PreTransitionActionType1"}
                label="Pre-Transition Action Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangePreTransitionHandler}
                placeholder="Select one option"
                style={widthStyle}
              >
                {preTransitionDropDownList.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.actionType}>
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>

              <AbSelect
                key={"PreTransitionAction2"}
                label="Pre-Transition Action"
                onBlur={function noRefCheck() {}}
                onChange={onChangePreTransitionActionTypeData}
                placeholder="Select one option"
                style={widthStyle}
              >
                {preTransitionActionDropDownList.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.key}>
                        {`Pre-Transition Action - ${data.text}`}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>
              <AbStack style={widthStyleLabel}>
                <AbInput
                  key={"Pre-Transition Data Input"}
                  required={true}
                  label="Pre-Transition Data"
                  onChange={(e, newValue: any): any => {
                    setPreTransitionData(newValue);
                  }}
                  type={AbInputTypes.Text}
                />
              </AbStack>
              <div>
                <AbButton
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={function noRefCheck() {
                    setActive(0);
                  }}
                  variant="Default"
                >
                  Back
                </AbButton>
                <AbButton
                  style={{ marginTop: "10px" }}
                  onClick={function noRefCheck() {
                    setActive(2);
                  }}
                  variant="Primary"
                >
                  Next
                </AbButton>
              </div>
            </AbStepperStep>
            <AbStepperStep label="Post-Transition Action">
              <AbSelect
                key={"PostTransitionActionType1"}
                label="Post-Transition Action Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangePostTransitionHandler}
                placeholder="Select one option"
                style={widthStyle}
              >
                {postTransitionDropDownList.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.actionType}>
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>

              <AbSelect
                key={"PostTransitionAction2"}
                label="Post-Transition Action"
                onBlur={function noRefCheck() {}}
                onChange={onChangePostTransitionActionTypeData}
                placeholder="Select one option"
                style={widthStyle}
              >
                {postTransitionActionDropDownList.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption
                        key={`Post-Transition Action ${data.actionType}`}
                      >
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>
              <AbStack style={widthStyleLabel}>
                <AbInput
                  key={"Post-Transition Data Input"}
                  required={true}
                  label="Post-Transition Data"
                  onChange={(e, newValue: any): any => {
                    setPostTransitionData(newValue);
                  }}
                  type={AbInputTypes.Text}
                />
              </AbStack>
              <div>
                <AbButton
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={function noRefCheck() {
                    setActive(1);
                  }}
                  variant="Default"
                >
                  Back
                </AbButton>
                <AbButton
                  style={{ marginTop: "10px" }}
                  onClick={function noRefCheck() {
                    setActive(3);
                  }}
                  variant="Primary"
                >
                  Next
                </AbButton>
              </div>
            </AbStepperStep>
            <AbStepperStep label="Conditional Next Step">
              <AbSelect
                key={"conditionalType1"}
                label="Conditional Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangeConditionalNextState}
                placeholder="Select one option"
                style={widthStyle}
              >
                {conditionalNextStateDropDownList.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.actionType}>
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>

              <AbSelect
                label="Condition"
                onBlur={function noRefCheck() {}}
                onChange={onChangeConditionalNextStateData}
                placeholder="Select one option"
                style={widthStyle}
              >
                <AbSelectOption key={1}>Option1</AbSelectOption>;
                <AbSelectOption key={2}>Option2</AbSelectOption>;
                <AbSelectOption key={3}>Option3</AbSelectOption>;
              </AbSelect>

              <AbSelect
                label="Order"
                onBlur={function noRefCheck() {}}
                onChange={onChangeConditionalOrder}
                placeholder="Select one option"
                style={widthStyle}
              >
                {order.map((data: any): any => {
                  if (data) {
                    return (
                      <AbSelectOption key={data.actionType}>
                        {data.text}
                      </AbSelectOption>
                    );
                  }
                })}
              </AbSelect>
              <AbStack style={widthStyleLabel}>
                <AbInput
                  key={"Conditional Next Step Input"}
                  required={true}
                  label="Conditional Next Step"
                  onChange={(e, newValue: any): any => {
                    setConditionNextStateData(newValue);
                  }}
                  type={AbInputTypes.Text}
                />
              </AbStack>
              <div>
                <AbButton
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={function noRefCheck() {
                    setActive(2);
                  }}
                  variant="Default"
                >
                  Back
                </AbButton>
                <AbButton
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    const edgeObj = {
                      TransitionName: transitionName,
                      SystemEventCode: onChangeSystemEventCode,
                      PreTransitionAction: {
                        PreTransitionType: preTransitionActionType,
                        PreTransitionAction: preTransitionActionTypeData,
                        PreTransitionData: preTransitionData,
                      },

                      PostTransitionAction: {
                        PostTransitionType: postTransitionActionType,
                        PreTransitionAction: postTransitionActionTypeData,
                        PostTransitionData: postTransitionData,
                      },

                      ConditionalNextStates: {
                        ConditionType: conditionalNextStateType,

                        Condition: conditionalNextStateTypeData,

                        Order: conditionalOrder,

                        NextState: conditionNextStateData,
                      },
                    };
                    console.log(edgeObj);
                    props.alterEdge(transitionName, edgeObj, props.edge.id);
                  }}
                  variant="Primary"
                >
                  Submit
                </AbButton>
              </div>
            </AbStepperStep>
          </AbStepper>
        </AbPanelBody>
      </AbPanel>
    </ThemeProvider>
  );
};

export default EdgeFormPanel;
