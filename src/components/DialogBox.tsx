import React from "react";
import { Dialog, DialogFooter } from "@fluentui/react/lib/Dialog";
import { DefaultButton } from "@fluentui/react/lib/Button";
import {
  AbButton,
  AbButtonType,
  AbInput,
  AbInputTypes,
} from "@surya-soft/surya-ab-reactui";
import { useForm } from "react-hook-form";
const DialogBox = (props: any) => {
  const { handleSubmit, control } = useForm<any>({
    mode: "all",
    defaultValues:{
      Node_name:props.node?.name
    }
  });
  const dismissHandler = () => {
    props.setOpenDialogBox((val: any) => !val);
  };
  const onSubmit = (data: any) => {
    // console.log(data);
    props.submitEditForm(data.Node_name,props.node);
    dismissHandler();
  };
  const dialogContentProps = {
    title: 'Edit State Name',
    closeButtonAriaLabel: 'Close',
    subText: 'Enter the new state name of the selected state',
  };

  return (
   
    <Dialog hidden={false} onDismiss={dismissHandler} dialogContentProps={dialogContentProps} >
      <form onSubmit={handleSubmit(onSubmit)}>
        <AbInput
        key={'Node_name'}
          name={"Node_name"}
          control={control}
          rules={{
            required: "This field is required",
            maxLength: {
              value: 10,
              message: "Maximum length exceeded",
            },
            minLength: {
              value: 3,
              message: "Enter minimum 3 characters ",
            },
          }}
          required={true}
          label="State Name"
          type={AbInputTypes.Text}
        />
        <DialogFooter>
          
          <DefaultButton text="Cancel"style={{ marginTop: "10px" }} onClick={dismissHandler} />
          <AbButton
            type={AbButtonType.submit}
            style={{ marginTop: "10px" }}
            variant="Primary"
          >
            Submit
          </AbButton>
        </DialogFooter>
      </form>
    </Dialog>

  );
};

export default DialogBox;
