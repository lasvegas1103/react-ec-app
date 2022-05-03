import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Auth,
  Signup,
  Signin,
  ProductList,
  ProductRegist,
  ProductDetail,
} from "./features/index";

const Router = () => {
  return (
    <Switch>
      <Auth>
        <Route exact path="/product/list" component={ProductList} />
        <Route exact path="/product/regist" component={ProductRegist} />
        <Route
          exact
          path="/product/detail/:productId"
          component={ProductDetail}
        />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/signin" component={Signin} />
      </Auth>
    </Switch>
  );
};

export default Router;
