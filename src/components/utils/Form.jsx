import React from "react";
import { useForm, FormProvider } from "react-hook-form";

/**
 * react hook form のフォームコンポーネント
 * @param {*} param0
 * @returns
 */
const Form = ({ children, onSubmit }) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {React.Children.map(children, (child) => {
          return child.props.name
            ? React.createElement(child.type, {
                ...{
                  ...child.props,
                  key: child.props.name,
                  ...methods,
                },
              })
            : child;
        })}
      </form>
    </FormProvider>
  );
};

export default Form;
