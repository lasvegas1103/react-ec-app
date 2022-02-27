import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Auth,
  Signup,
  Signin,
  ProductList,
  ProductRegist,
} from "./features/index";

const Router = () => {
  return (
    <Switch>
      <Auth>
        <Route exact path="/products/list" component={ProductList} />
        <Route exact path="/products/regist" component={ProductRegist} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Auth>
    </Switch>
  );
};

export default Router;
