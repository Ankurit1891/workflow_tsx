/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState, useEffect } from "react";
import { ThemeProvider, useTheme } from "@fluentui/react";
import { useForm } from "react-hook-form";
import {
  AbButton,
  AbButtonType,
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
  const [selectedKeySystemCodeData, setSelectedKeySystemCodeData] = useState(
    props.edge.data.SystemEventCode?.actionType ?? ""
  );
  const [
    selectedKeyPre_Transition_Action_Type,
    setSelectedKeyPre_Transition_Action_Type,
  ] = useState(
    props.edge.data.PreTransitionAction?.PreTransitionType.actionType ?? ""
  );
  const [
    selectedKeyPre_Transition_Action,
    setSelectedKeyPre_Transition_Action,
  ] = useState(
    props.edge.data.PreTransitionAction?.PreTransitionAction.actionType ?? ""
  );
  const [selectedKeyPost_Transition_Action_Type, setSelectedKeyPost_Transition_Action_Type] = useState(props.edge.data.PostTransitionAction?.PostTransitionType.actionType ?? "");

  // system event code drop down list
  const [systemCodeData, setSystemCodeData] = useState<any>([]);
  // system event code change handler
  const [onChangeSystemEventCode, setOnChangeSystemEventCode] = useState({
    actionType: "",
    input: "",
  });

  // primary Drop Down List
  const [preTransitionDropDownList, setPreTransitionDropDownList]: any =
    useState([]);
  const [postTransitionDropDownList, setPostTransitionDropDownList]: any =
    useState([]);

  // primary drop down handler
  const [preTransitionActionType, setPreTransitionActionType] = useState({
    actionType: 0,
    input: "",
  });
  const [postTransitionActionType, setPostTransitionActionType] = useState({
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

  // secondary drop down list
  const [
    preTransitionActionDropDownList,
    setPreTransitionActionDropDownList,
  ]: any = useState([]);
  const [
    postTransitionActionDropDownList,
    setPostTransitionActionDropDownList,
  ]: any = useState([]);

  const [active, setActive] = useState(0);
  const { handleSubmit, control } = useForm<any>({
    mode: "all",
    defaultValues: {
      Transition_Name: props.edge.data.TransitionName,
      Pre_Transition_Data:
        props.edge.data.PreTransitionAction?.PreTransitionData,
      Post_Transition_Data:
        props.edge.data.PostTransitionAction?.PostTransitionData,
    },
  });

  const onChangeSystemEventCodeHandler = (e: any, option: any) => {
    setSelectedKeySystemCodeData(option.key);
    return setOnChangeSystemEventCode((prev) => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  const onChangePreTransitionHandler = (e: any, option: any) => {
    setSelectedKeyPre_Transition_Action_Type(option.key);
    let key = option.key;
    const url = `/api/pre_transition_action/${key}`;
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
    setSelectedKeyPost_Transition_Action_Type(option.key);
    let key = option.key;
    const url = `/api/post_transition_action/${key}`;
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

  const onChangePreTransitionActionTypeData = (e: any, option: any) => {
    setSelectedKeyPre_Transition_Action(option.key);
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

  useEffect(() => {
    fetch("/api/event_code")
      .then((res) => res.json())
      .then((json) => {
        setSystemCodeData(json.codes);
      });
    if (props.edge.data !== "") {
      const option = {
        key: props.edge.data.SystemEventCode?.actionType,
        text: props.edge.data.SystemEventCode?.input,
      };
      console.log(option);
      onChangeSystemEventCodeHandler("a", option);
    }
    fetch("/api/pre_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPreTransitionDropDownList(json.data);
      });
    fetch("/api/post_transition_options")
      .then((res) => res.json())
      .then((json) => {
        setPostTransitionDropDownList(json.data);
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

  const onSubmit = (data: any) => {
    const edgeObj = {
      TransitionName: data.Transition_Name,
      SystemEventCode: onChangeSystemEventCode,
      PreTransitionAction: {
        PreTransitionType: preTransitionActionType,
        PreTransitionAction: preTransitionActionTypeData,
        PreTransitionData: data.Pre_Transition_Data,
      },

      PostTransitionAction: {
        PostTransitionType: postTransitionActionType,
        PostTransitionAction: postTransitionActionTypeData,
        PostTransitionData: data.Post_Transition_Data,
      },
    };
    console.log(edgeObj);
    props.alterEdge(data.Transition_Name, edgeObj, props.edge.id);
    props.setEdgeOpenFormModal(false);
  };

  return (
    <ThemeProvider theme={AbDarkTheme}>
      <AbPanel
        lightDismiss={true}
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <AbStepper
              key={1}
              size="small"
              showStepNumbers={false}
              activeIndex={active}
              onStepClick={setActive}
              orientation="vertical"
            >
              <AbStepperStep label="Transition Name" key="Transition Name">
                <AbStack style={widthStyleLabel}>
                  <AbInput
                    name={"Transition_Name"}
                    control={control}
                    rules={{
                      required: "This field is required",
                      maxLength: {
                        value: 10,
                        message: "Maximum length exceeded",
                      },
                      minLength: {
                        value: 5,
                        message: "Enter minimum 5 characters ",
                      },
                    }}
                    required={true}
                    label="Transition Name"
                    type={AbInputTypes.Text}
                  />
                </AbStack>
                <AbSelect
                  name={"System_Event_Code"}
                  key={"System_Event_Code"}
                  label="System Event Code"
                  defaultSelectedKey={selectedKeySystemCodeData}
                  onChange={onChangeSystemEventCodeHandler}
                  placeholder="Select one option"
                  style={widthStyle}
                >
                  {systemCodeData.map((data: any): any => {
                    if (data) {
                      return (
                        <AbSelectOption key={data.key}>
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
              <AbStepperStep
                label="Pre-Transition Action"
                key="Pre-Transition Action"
              >
                <AbSelect
                  name={"Pre_Transition_Action_Type"}
                  key={"PreTransitionActionType1"}
                  label="Pre-Transition Action Type"
                  defaultSelectedKey={selectedKeyPre_Transition_Action_Type}
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
                  defaultChecked={selectedKeyPre_Transition_Action}
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
                  name={"Pre_Transition_Data"}
                    control={control}
                    rules={{
                      required: "This field is required",
                      maxLength: {
                        value: 10,
                        message: "Maximum length exceeded",
                      },
                      minLength: {
                        value: 5,
                        message: "Enter minimum 5 characters ",
                      },
                    }}
                    key={"Pre-Transition Data Input"}
                    required={true}
                    label="Pre-Transition Data"
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
                    onClick={()=>
                      setActive(2)
                    }
                    variant="Primary"
                  >
                    Next
                  </AbButton>
                </div>
              </AbStepperStep>
              <AbStepperStep
                label="Post-Transition Action"
                key="Post-Transition Action"
              >
                <AbSelect
                required={true}
                  key={"PostTransitionActionType1"}
                  label="Post-Transition Action Type"
                  onChange={onChangePostTransitionHandler}
                  placeholder="Select one option"
                  style={widthStyle}
                  defaultSelectedKey={selectedKeyPost_Transition_Action_Type}
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
                  onChange={onChangePostTransitionActionTypeData}
                  placeholder="Select one option"
                  style={widthStyle}
                >
                  {postTransitionActionDropDownList.map((data: any): any => {
                    if (data) {
                      return (
                        <AbSelectOption
                          key={`Post-Transition Action ${data.key}`}
                        >
                          {data.text}
                        </AbSelectOption>
                      );
                    }
                  })}
                </AbSelect>
                <AbStack style={widthStyleLabel}>
                  <AbInput
                    name={"Post_Transition_Data"}
                    control={control}
                    rules={{
                      required: "This field is required",
                      maxLength: {
                        value: 10,
                        message: "Maximum length exceeded",
                      },
                      minLength: {
                        value: 5,
                        message: "Enter minimum 5 characters ",
                      },
                    }}
                    key={"Post-Transition Data Input"}
                    required={true}
                    label="Post-Transition Data"
                    type={AbInputTypes.Text}
                  />
                </AbStack>
                <div>
                  <AbButton
                    style={{ marginTop: "10px", marginRight: "10px" }}
                    onClick={() => setActive(1)}
                    variant="Default"
                  >
                    Back
                  </AbButton>
                  <AbButton
                    type={AbButtonType.submit}
                    style={{ marginTop: "10px" }}
                    variant="Primary"
                  >
                    Submit
                  </AbButton>
                </div>
              </AbStepperStep>
            </AbStepper>
          </form>
        </AbPanelBody>
      </AbPanel>
    </ThemeProvider>
  );
};

export default EdgeFormPanel;
