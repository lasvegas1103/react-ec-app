import React from "react";
import { Route, Switch } from "react-router-dom";
import {
  Auth,
  Signup,
  Signin,
  ProductList,
  ProductRegist,
  ProductDetail,
  FavoriteDetail,
} from "./features/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Signin} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <Auth>
        <Route path="/product/list/" component={ProductList} />
        <Route path="/product/regist" component={ProductRegist} />
        <Route
          exact
          path="/product/detail/:productId"
          component={ProductDetail}
        />
        <Route exact path="/user/favoritelist" component={FavoriteDetail} />
      </Auth>
    </Switch>
  );
};

export default Router;
