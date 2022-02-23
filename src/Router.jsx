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
      <Route exact path="/product/list" component={ProductList} />
      <Route exact path="/product/regist" component={ProductRegist} />
      <Auth>
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Auth>
    </Switch>
  );
};

export default Router;
