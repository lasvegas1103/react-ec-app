import React from "react";
import { useForm } from "react-hook-form";

const Form = ({ children, onSubmit }) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    register,
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
                setValue,
                register,
              },
            })
          : child;
      })}
    </form>
  );
};

export default Form;
