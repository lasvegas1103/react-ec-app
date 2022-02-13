import React from "react";
import { Route, Switch } from "react-router-dom";
import { Auth, Signup, Signin } from "./features/index";

const Router = () => {
  return (
    <Switch>
      <Auth>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Auth>
    </Switch>
  );
};

export default Router;
