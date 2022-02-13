import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@mui/material";

const Form = ({ children, onSubmit }) => {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(children, (child) => {
        return child.props.name
          ? React.createElement(child.type, {
              ...{
                ...child.props,
                key: child.props.name,
                control,
                errors,
                getValues,
              },
            })
          : child;
      })}
    </form>
  );
};

export default Form;
