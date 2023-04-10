/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
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
} from "@surya-soft/surya-ab-reactui";
import { useForm } from "react-hook-form";

const ConditionalPanel = (props: any) => {
  const [
    conditionalNextStateDropDownList,
    setConditionalNextStateDropDownList,
  ]: any = useState([]);
  const [condition, setCondition]: any = useState([]);
  const [order, setOrder]: any = useState([]);

const [selectedKeyConditionType, setSetSelectedKeyConditionType] = useState(props.edge.data?.Condition_Type?.actionType??"");
const [selectedKeyCondition, setSelectedKeyCondition] = useState(props.edge.data?.Condition?.actionType??"");
const [selectedKeyOrder, setSelectedKeyOrder] = useState(props.edge.data?.Order?.actionType??"");

  const [conditionalNextStateType, setConditionalNextStateType] = useState(props.edge.data?.Condition_Type??{
    actionType: 0,
    input: "",
  });
  const [conditionalOrder, setConditionalOrder] = useState<any>(props.edge.data?.Order??{
    actionType: 0,
    input: "",
  });
  const [conditionData, setConditionData] =
    useState(props.edge.data?.Condition??{
      actionType: "",
      input: "",
    });


  const { handleSubmit, control } = useForm<any>({
    mode: "all",
    defaultValues: {
      Conditional_Next_Step_Data:
        props.edge.data.Condition_Name,
    },
  });
  const dismiss = (): any => {
    props.setOpenConditionalPanel(false);
    return props.dismissHandler;
  };

  const widthStyle = {
    width: 400,
  };

  const widthStyleLabel = {
    maxWidth: "400px",
  };
  useEffect(() => {
    if(props.edge.data)
    {
      // console.log(props.edge.data?.Condition_Type?.actionType);
      // console.log(props.edge.data?.Order?.actionType);
      // console.log(props.edge.data?.Condition?.actionType);
    }
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

  const onChangeConditionType = (e: any, option: any) => {
    setSetSelectedKeyConditionType(option.key);
    

    setConditionalNextStateType(() => ({
      actionType: option.key,
      input: option.text,
    }));

    
  };

  const onChangeCondition = (e: any, option: any) => {
    setSelectedKeyCondition(option.key);
    setConditionData(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };

  const onSubmit = handleSubmit((data: any) => {
    let nextStateName="";
    props.nodes.map((node:any)=>{
      if(props.edge.target===node.id)
      {
        nextStateName=node.name;
      }
    })
    // console.log('NAME: ',data.Conditional_Next_Step_Data , ' Conditional Type : ',conditionalNextStateType, ' Condition: ',conditionData , " Order: ",conditionalOrder);
    const conditionEdgeObject={
        Condition_Name:data.Conditional_Next_Step_Data,
        Condition_Type:conditionalNextStateType,
        Condition:conditionData,
        Order:conditionalOrder,
        Conditional_Next_State:nextStateName,
    }
    props.alterConditionalEdge(data.Conditional_Next_Step_Data, conditionEdgeObject, props.edge.id);
    props.setOpenConditionalPanel(false);
  });
  const onChangeOrder = (e: any, option: any) => {
    setSelectedKeyOrder(option.key);
    setConditionalOrder(() => ({
      actionType: option.key,
      input: option.text,
    }));
  };
  return (
    <>
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
          <form >
          <AbStack style={widthStyleLabel}>
              <AbInput
                name={"Conditional_Next_Step_Data"}
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
                key={"Conditional Next Step Input"}
                required={true}
                label="Condition Name"
                type={AbInputTypes.Text}
              />
            </AbStack>
            <AbSelect
              defaultSelectedKey={selectedKeyConditionType}
              key={"conditionalType1"}
              label="Conditional Type"
              onChange={onChangeConditionType}
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
              defaultSelectedKey={selectedKeyCondition}
              onChange={onChangeCondition}
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
              onChange={onChangeOrder}
              defaultSelectedKey={selectedKeyOrder}
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

            <div>
              <AbButton
              onClick={onSubmit}
                type={AbButtonType.submit}
                style={{ marginTop: "10px" }}
                variant="Primary"
              >
                Submit
              </AbButton>
            </div>
          </form>
        </AbPanelBody>
      </AbPanel>
    </>
  );
};

export default ConditionalPanel;
