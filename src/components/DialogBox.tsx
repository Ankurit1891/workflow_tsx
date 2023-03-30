import React from "react";
import { Dialog,  DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { AbInput, AbInputTypes } from "@surya-soft/surya-ab-reactui";
import { useForm } from "react-hook-form";
const DialogBox = (setOpenDialogBox:any) => {
  const { handleSubmit, control } = useForm<any>({
    mode: "all",
  });
  const dismissHandler=()=>{
    return setOpenDialogBox(false);
  }
  return (
      <Dialog
        hidden={false}
        // onDismiss={}
      ><AbInput
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
          <PrimaryButton text="Send" />
          <DefaultButton text="Cancel" />
        </DialogFooter>
      </Dialog>

  );
};

export default DialogBox;
