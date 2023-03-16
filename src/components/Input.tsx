import { TextField } from "@fluentui/react";
import React from "react";
import { Controller } from "react-hook-form";

export const Input = ({
  control,
  name,
  label,
  placeholder,
  rules,
  style,
  data,
}: any) => {
  return (
    <div style={style}>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field, fieldState, formState }) => {
          return (
            <TextField
              label={label}
              placeholder={placeholder}
              defaultValue={data}
              value={field.value}
              onChange={field.onChange}
              errorMessage={fieldState.error?.message ?? undefined}
            />
          );
        }}
      />
    </div>
  );
};

export const TextArea = ({
  control,
  name,
  label,
  placeholder,
  rules,
  style,
}: any) => {
  return (
    <div style={style}>
      <Controller
        control={control}
        rules={rules}
        name={name}
        render={({ field, fieldState, formState }) => {
          return (
            <TextField
              label={label}
              multiline
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              errorMessage={fieldState.error?.message ?? undefined}
            />
          );
        }}
      />
    </div>
  );
};
