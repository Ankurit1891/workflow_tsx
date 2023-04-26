import React, { useEffect, useState } from "react";
import {
  AbButton,
  AbButtonType,
  AbInput,
  AbInputTypes,
  AbPanel,
  AbPanelBody,
  AbPanelFooter,
  AbPanelHeader,
  AbSelect,
  AbSelectOption,
  AbStack,
  AbStepper,
  AbStepperStep,
} from "@surya-soft/surya-ab-reactui";
import { useForm } from "react-hook-form";
const ConditionalNodePanel = (props: any) => {
  const [
    conditionalNextStateDropDownList,
    setConditionalNextStateDropDownList,
  ]: any = useState([]);
  const [condition, setCondition]: any = useState([]);
  const [order, setOrder]: any = useState([]);
  const [active, setActive] = useState(0);
  //   const [selectedKeyConditionType, setSetSelectedKeyConditionType] = useState(
  //     props.node.additionalData?.Condition_Type?.actionType ?? ""
  //   );
  //   const [selectedKeyCondition, setSelectedKeyCondition] = useState(
  //     props.node.additionalData?.Condition?.actionType ?? ""
  //   );
  //   const [selectedKeyOrder, setSelectedKeyOrder] = useState(
  //     props.node.additionalData?.Order?.actionType ?? ""
  //   );

  const [conditionalNextStateType2, setConditionalNextStateType2] = useState(
    props.node.additionalData?.Condition_Type ?? {
      actionType: 0,
      input: "",
    }
  );
  const [conditionalOrder2, setConditionalOrder2] = useState<any>(
    props.node.additionalData?.Order ?? {
      actionType: 0,
      input: "",
    }
  );
  const [conditionData2, setConditionData2] = useState(
    props.node.additionalData?.Condition ?? {
      actionType: "",
      input: "",
    }
  );

  const { handleSubmit, control } = useForm<any>({
    mode: "all",
    defaultValues: {
      //   Conditional_Next_Step_Data: props.edge.data.Condition_Name,
    },
  });
  const dismiss = (): any => {
    props.setOpenConditionalPanel(false);
    return props.dismissHandler;
  };

  const widthStyle = {
    width: 500,
  };

  const widthStyleLabel = {
    maxWidth: "550px",
    paddingLeft: "50px",
  };
  useEffect(() => {
    fetch("/api/conditional_next_state")
      .then((res) => res.json())
      .then((json) => {
        setConditionalNextStateDropDownList(json.data);
      });
    const url = `/api/conditional_next_state/condition`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setCondition(json.data);
      });
    const url1 = `/api/conditional_next_state/order`;
    fetch(url1)
      .then((res) => res.json())
      .then((json) => {
        setOrder(json.data);
      });
  }, []);

  const onChangeConditionType2 = (e: any, option: any) => {
    // setSetSelectedKeyConditionType(option.key);
    setConditionalNextStateType2(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onChangeCondition2 = (e: any, option: any) => {
    // setSelectedKeyCondition(option.key);
    setConditionData2(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onChangeOrder2 = (e: any, option: any) => {
    // setSelectedKeyOrder(option.key);
    setConditionalOrder2(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onSubmit = handleSubmit((data: any) => {
    console.log(data);

    const obj1 = {
      ConditionName: data.Conditional_Next_Step_Data_2,
      conditionalNextStateType: conditionalNextStateType2,
      conditionalOrder: conditionalOrder2,
      conditionData: conditionData2,
    };
    console.log(`OBJECT 1 = > `, JSON.stringify(obj1));

    // let nextStateName = "";
    // props.nodes.map((node: any) => {
    //   if (props.edge.target === node.id) {
    //     nextStateName = node.name;
    //   }
    // });
    // console.log('NAME: ',data.Conditional_Next_Step_Data , ' Conditional Type : ',conditionalNextStateType, ' Condition: ',conditionData , " Order: ",conditionalOrder);
    // const conditionEdgeObject = {
    //   ConditionName: data.Conditional_Next_Step_Data,
    // //   ConditionType: conditionalNextStateType,
    // //   Condition: conditionData,
    // //   Order: conditionalOrder,
    //   NextState: nextStateName,
    // };
    // const objectModal = {
    //   ConditionName: data.Conditional_Next_Step_Data,
    // //   ConditionType: conditionalNextStateType.input,
    // //   Condition: conditionData.input,
    // //   Order: conditionalOrder.input,
    //   NextState: nextStateName,
    // };
    // props.alterConditionalEdge(
    //   data.Conditional_Next_Step_Data,
    //   conditionEdgeObject,
    //   objectModal,
    //   props.edge.id
    // );
    props.setOpenConditionalPanel(false);
  });

  return (
    <>
      <form key={props.node.id}>
        <AbPanel
          lightDismiss={true}
          isOpen={props.isOpen}
          placement={"right"}
          onDismiss={dismiss}
          size="M"
          modalLike={true}
        >
          <AbPanelHeader>
            <span style={{ fontSize: "20px", fontWeight: "600" }}>
              Conditional Next States
            </span>
          </AbPanelHeader>
          <AbPanelBody>
            <AbStack style={widthStyleLabel}>
              <AbInput
                autoFocus
                name={"Conditional_Next_Step_Data_2"}
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
                key={"Conditional Next Step Input 2"}
                required={true}
                label="Condition Name"
                type={AbInputTypes.Text}
              />

              <AbSelect
                //   defaultSelectedKey={selectedKeyConditionType}
                key={"conditionalType2"}
                label="Conditional Type"
                onChange={onChangeConditionType2}
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
                //   defaultSelectedKey={selectedKeyCondition}
                onChange={onChangeCondition2}
                key={"Condition2"}
                placeholder="Select one option"
                style={widthStyle}
              >
                {condition.map((data: any): any => {
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
                label="Order"
                key={"Order2"}
                onChange={onChangeOrder2}
                //   defaultSelectedKey={selectedKeyOrder}
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
            </AbStack>
          </AbPanelBody>
          <AbPanelFooter>
            <AbButton
              onClick={onSubmit}
              type={AbButtonType.submit}
              style={{ marginTop: "10px" }}
              variant="Primary"
            >
              Submit
            </AbButton>
          </AbPanelFooter>
        </AbPanel>
      </form>
    </>
  );
};

export default ConditionalNodePanel;
