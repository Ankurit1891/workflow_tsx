/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { Input } from "./Input";
import { Panel, PanelType } from "@fluentui/react";
// import event_code from "../api_data/event_code";
import { Flex, Stepper, Styles, StepperStylesNames, Step } from "@mantine/core";
import { useForm } from "react-hook-form";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { Background } from "reactflow";
import {
  AbButton,
  AbInput,
  AbInputTypes,
  AbPanel,
  AbPanelBody,
  AbPanelHeader,
  AbSelect,
  AbSelectHeader,
  AbSelectOption,
  AbStack,
  AbStackItem,
  AbStepper,
  AbStepperStep,
  AbText,
} from "@surya-soft/surya-ab-reactui";

const EdgeFormPanel = (props: any) => {
  const [systemCodeData, setSystemCodeData] = useState<any>([]);
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
  const dismiss = (): any => {
    props.setEdgeOpenFormModal(false);
    return props.dismissHandler;
  };
  const widthStyle = {
    width: 371,
  };
  console.log(primaryDropDown);
  return (
    <AbPanel
      isOpen={props.isOpen}
      placement={"right"}
      onDismiss={dismiss}
      size="M"
      modalLike={true}
    >
      <AbPanelHeader>Transition</AbPanelHeader>
      <AbPanelBody>
        <AbStepper
          activeIndex={active}
          onStepClick={function noRefCheck() {}}
          orientation="vertical"
        >
          <AbStepperStep label="Transition Name">
            <AbStack
              style={{
                maxWidth: "250",
              }}
            >
              <AbInput
                required={true}
                label="Transition Name"
                onChange={function noRefCheck() {}}
                type={AbInputTypes.Text}
              />
            </AbStack>
            <AbSelect
              label="Default Select"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {systemCodeData.map((data: any): any => {
                if (data) {
                  return (
                    <AbSelectOption key={data.key}>{data.text}</AbSelectOption>
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
              label="Pre-Transition Action"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {primaryDropDown.preTranstionOptions.map((data: any): any => {
                if (data) {
                  return (
                    <AbSelectOption key={data.key}>{data.text}</AbSelectOption>
                  );
                }
              })}
            </AbSelect>

            <AbSelect
              label="Pre-Transition Action"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {/* {systemCodeData.map((data: any): any => {
                if (data) {
                  console.log(data.text);
                  <AbSelectOption key={dat a.key}>{data.text}</AbSelectOption>;
                }
              })} */}
              <AbSelectOption key={1}>Option1</AbSelectOption>;
              <AbSelectOption key={2}>Option2</AbSelectOption>;
              <AbSelectOption key={3}>Option3</AbSelectOption>;
            </AbSelect>

            <AbInput
              required={true}
              label="Pre-Transition Data"
              onChange={function noRefCheck() {}}
              type={AbInputTypes.Text}
            />
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
              label="Post-Transition Action"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {primaryDropDown.postTranstionOptions.map((data: any): any => {
                if (data) {
                  return (
                    <AbSelectOption key={data.key}>{data.text}</AbSelectOption>
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
                  <AbSelectOption key={dat a.key}>{data.text}</AbSelectOption>;
                }
              })} */}
              <AbSelectOption key={1}>Option1</AbSelectOption>;
              <AbSelectOption key={2}>Option2</AbSelectOption>;
              <AbSelectOption key={3}>Option3</AbSelectOption>;
            </AbSelect>

            <AbInput
              required={true}
              label="Post-Transition Data"
              onChange={function noRefCheck() {}}
              type={AbInputTypes.Text}
            />
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
              label="Conditional Next Step"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {primaryDropDown.conditionalNextState.map((data: any): any => {
                if (data) {
                  return (
                    <AbSelectOption key={data.key}>{data.text}</AbSelectOption>
                  );
                }
              })}
            </AbSelect>

            <AbSelect
              label="Conditional Next Step"
              onBlur={function noRefCheck() {}}
              onChange={function noRefCheck() {}}
              placeholder="Select one option"
              style={widthStyle}
            >
              {/* {systemCodeData.map((data: any): any => {
                if (data) {
                  <AbSelectOption key={data.key}>dada</AbSelectOption>;
                }
              })} */}
              <AbSelectOption key={1}>Option1</AbSelectOption>;
              <AbSelectOption key={2}>Option2</AbSelectOption>;
              <AbSelectOption key={3}>Option3</AbSelectOption>;
            </AbSelect>

            <AbInput
              required={true}
              label="Conditional Next Step"
              onChange={function noRefCheck() {}}
              type={AbInputTypes.Text}
            />
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
  );
};

export default EdgeFormPanel;
