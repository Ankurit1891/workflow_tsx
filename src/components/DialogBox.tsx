import React from "react";
import { Dialog, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
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
  });
  const dismissHandler = () => {
    props.setOpenDialogBox((val: any) => !val);
  };
  const onSubmit = (data: any) => {
    console.log(data);
    props.submitEditForm(data.Node_name,props.node);
    dismissHandler();
  };
  return (
    <Dialog hidden={false} onDismiss={dismissHandler}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AbInput
          name={"Node_name"}
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
          label="Node Name"
          type={AbInputTypes.Text}
        />
        <DialogFooter>
          <AbButton
            type={AbButtonType.submit}
            style={{ marginTop: "10px" }}
            variant="Primary"
          >
            Submit
          </AbButton>
          <DefaultButton text="Cancel" onClick={dismissHandler} />
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default DialogBox;
