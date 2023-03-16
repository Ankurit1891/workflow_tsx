import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { Panel, PanelType } from "@fluentui/react";
// import event_code from "../api_data/event_code";
import { Flex, Stepper, Styles, StepperStylesNames, Step } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Dropdown } from "@fluentui/react/lib/Dropdown";

const EdgeFormPanel = (props: any) => {
  const [systemCodeData, setSystemCodeData] = useState([]);
  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState();
  const [primaryDropDown, setPrimaryDropDown] = useState({
    preTranstionOptions: [],
    postTranstionOptions: [],
    conditionalNextState: [],
  });
  const [preTranstionValue, setPreTranstionValue] = useState({
    actionType: "",
    input: "",
  });
  const [postTranstionValue, setPostTranstionValue] = useState({
    actionType: "",
    input: "",
  });
  const [conditionalNextState, setConditionalNextState] = useState({
    actionType: "",
    input: "",
  });
  const [showFirst, setshowFirst] = useState(true);
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
    setPreTranstionValue((prev) => ({
      actionType: option.actionType,
      input: option.text,
    }));
  };
  const onChangePostTransitionHandler = (e: any, option: any) => {
    setPostTranstionValue((prev) => ({
      actionType: option.actionType,
      input: option.text,
    }));
  };
  const onChangeConditionalNextState = (e: any, option: any) => {
    setConditionalNextState((prev) => ({
      actionType: option.actionType,
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
          preTranstionOptions: [...json.data],
        }));
      });
  }, []);

  useEffect(() => {
    fetch("/api/post_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPrimaryDropDown((prev: any) => ({
          ...prev,
          postTranstionOptions: [...json.data],
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
  const verticalStepperStyles: Styles<StepperStylesNames, never> = {
    content: {
      padding: 32,
      overflowY: "auto",
      width: "100%",
      height: "100%",
    },
    root: {
      display: "flex",
      height: "100%",
    },
    stepLabel: {
      marginTop: "4px",
    },
    stepIcon: {
      backgroundColor: "transparent",
      border: "none",
    },
    steps: {
      marginRight: 32,
      width: "30%",
      marginTop: 32,
    },

    verticalSeparatorActive: {
      borderColor: "green",
    },
  };
  return (
    <div>
      <Panel
        headerText="Transition"
        type={PanelType.medium}
        isOpen={props.isOpen}
        onDismiss={props.dismissHandler}
        closeButtonAriaLabel="Close"
      >
        <div
          style={{
            width: "100%",
            height: "0.1px",
            backgroundColor: "#484848",
            marginTop: "5px",
          }}
        ></div>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <div
            style={{
              marginTop: "50px",
            }}
          >
            <div>
              <Stepper
                active={active}
                onStepClick={setActive}
                breakpoint="sm"
                iconSize={30}
                orientation="vertical"
                styles={verticalStepperStyles}
              >
                <Stepper.Step
                  label="Transtion Name"
                  // styles={step:{
                  //   color: props.theme ? "black" : "white"
                  // }}
                  //  stepIcon: "5",
                >
                  <div style={{ marginRight: "20px" }}>
                    <Input
                      style={{ width: "350px" }}
                      control={control}
                      // {...register("transitionName")}
                      name="transitionName"
                      label="Transition Name"
                      rules={{
                        required: "This is required",
                        minLength: {
                          value: 5,
                          message: "Minimun character is 5",
                        },
                        maxLength: {
                          value: 10,
                          message: "Maximum character is 10",
                        },
                      }}
                      placeholder="Enter transition name  here"
                    />
                    <div style={{ height: "10px", width: "100%" }} />
                    <Dropdown
                      onChange={onChangeSystemEventCodeHandler}
                      label="System Event Code"
                      placeholder="Select an option"
                      options={systemCodeData}
                      style={{
                        width: "350px",
                        marginRight: "10px",
                      }}
                    />
                  </div>
                </Stepper.Step>
                <Stepper.Step
                  label="Transition Action"
                  style={{
                    color: props.theme ? "black" : "white",
                    fontWeight: "normal",
                  }}
                >
                  <Dropdown
                    // {...methods.register("Pre_Transition_Action")}
                    label="Pre-Transition Action"
                    onChange={onChangePreTransitionHandler}
                    placeholder="Select an option"
                    options={primaryDropDown.preTranstionOptions}
                    style={{
                      width: "350px",
                      marginRight: "10px",
                    }}
                  />

                  <Dropdown
                    label="Post-Transition Action"
                    onChange={onChangePostTransitionHandler}
                    placeholder="Select an option"
                    options={primaryDropDown.postTranstionOptions}
                    style={{
                      width: "350px",
                      marginRight: "10px",
                    }}
                  />

                  <Dropdown
                    label="Conditional Next State"
                    onChange={onChangeConditionalNextState}
                    placeholder="Select an option"
                    options={primaryDropDown.conditionalNextState}
                    style={{
                      width: "350px",
                      marginRight: "10px",
                    }}
                  />
                  <div
                    style={{
                      width: "100px",
                      height: "30px",
                      backgroundColor: "#e08080",
                      borderRadius: "20px",
                      padding: "5px",
                      marginTop: "20px",
                      color: "white",
                      textAlign: "center",
                    }}
                    onClick={(e) => {
                      console.log(
                        " preTranstionValue : ",
                        preTranstionValue,
                        " postTranstionValue : ",
                        postTranstionValue,
                        "conditionalNextState",
                        conditionalNextState,
                        "onChangeSystemEventCode",
                        onChangeSystemEventCode
                      );
                    }}
                  >
                    <button
                      type="submit"
                      style={{
                        color: "#ffffff",
                        border: "none",
                        backgroundColor: "#e08080",
                      }}
                    >
                      CLICK
                    </button>
                  </div>
                </Stepper.Step>
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  );
};

export default EdgeFormPanel;
