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
  const [transitionName, setTransitionName] = useState<any>("");
  const [systemCodeData, setSystemCodeData] = useState<any>([]);
  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState();
  const [primaryDropDown, setPrimaryDropDown] = useState({
    preTransitionOptions: [],
    postTransitionOptions: [],
    conditionalNextState: [],
  });
  const theme = useTheme();
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
    console.log("pre - ", option.key);
    setPreTransitionActionType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangePostTransitionHandler = (e: any, option: any) => {
    setPostTransitionActionType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangeConditionalNextState = (e: any, option: any) => {
    console.log(`awda - `, option);
    setConditionalNextStateType((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onChangePreTransitionActionTypeData = (e: any, option: any) => {
    console.log(`onChangePreTransitionActionTypeData`, option.text);
    setPreTransitionActionTypeData((prev) => ({
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
        setPrimaryDropDown((prev: any) => ({
          ...prev,
          preTransitionOptions: [...json.data],
        }));
      });
  }, []);

  useEffect(() => {
    fetch("/api/post_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPrimaryDropDown((prev: any) => ({
          ...prev,
          postTransitionOptions: [...json.data],
        }));
      });
  }, []);
  useEffect(() => {
    fetch("/api/conditional_next_state")
      .then((res) => res.json())
      .then((json) => {
        setPrimaryDropDown((prev: any) => ({
          ...prev,
          conditionalNextState: [...json.data],
        }));
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
  console.log(
    onChangeSystemEventCode,
    primaryDropDown,
    preTransitionActionType,
    postTransitionActionType,
    conditionalNextStateType
  );
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
                    console.log(newValue);
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
                label="Pre-Transition Action Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangePreTransitionHandler}
                placeholder="Select one option"
                style={widthStyle}
              >
                {primaryDropDown.preTransitionOptions.map((data: any): any => {
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
                label="Pre-Transition Action"
                onBlur={function noRefCheck() {}}
                onChange={onChangePreTransitionActionTypeData}
                placeholder="Select one option"
                style={widthStyle}
              >
                {systemCodeData.map((data: any): any => {
                  if (data) {
                    console.log("Pre-Transition Action", data.text);
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
                  required={true}
                  label="Pre-Transition Data"
                  onChange={function noRefCheck() {}}
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
                label="Post-Transition Action Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangePostTransitionHandler}
                placeholder="Select one option"
                style={widthStyle}
              >
                {primaryDropDown.postTransitionOptions.map((data: any): any => {
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
                label="Post-Transition Action"
                onBlur={function noRefCheck() {}}
                onChange={function noRefCheck() {}}
                placeholder="Select one option"
                style={widthStyle}
              >
                {/* {systemCodeData.map((data: any): any => {
                if (data) {
                  console.log(data.text);
                  <AbSelectOption key={dat a.actionType}>{data.text}</AbSelectOption>;
                }
              })} */}
                <AbSelectOption key={1}>Option1</AbSelectOption>;
                <AbSelectOption key={2}>Option2</AbSelectOption>;
                <AbSelectOption key={3}>Option3</AbSelectOption>;
              </AbSelect>
              <AbStack style={widthStyleLabel}>
                <AbInput
                  required={true}
                  label="Post-Transition Data"
                  onChange={function noRefCheck() {}}
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
                label="Conditional Type"
                onBlur={function noRefCheck() {}}
                onChange={onChangeConditionalNextState}
                placeholder="Select one option"
                style={widthStyle}
              >
                {primaryDropDown.conditionalNextState.map((data: any): any => {
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
                onChange={function noRefCheck() {}}
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
                onChange={function noRefCheck() {}}
                placeholder="Select one option"
                style={widthStyle}
              >
                <AbSelectOption key={1}>1</AbSelectOption>;
                <AbSelectOption key={2}>2</AbSelectOption>;
                <AbSelectOption key={3}>3</AbSelectOption>;
              </AbSelect>
              <AbStack style={widthStyleLabel}>
                <AbInput
                  required={true}
                  label="Conditional Next Step"
                  onChange={function noRefCheck() {}}
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
                  // onClick={function noRefCheck() {
                  //   setActive(3);
                  // }}
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
