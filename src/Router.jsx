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
  Cart,
  Chat,
  MyProfile,
  MyProfileForm,
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
          path="/product/detail/:productId/:fromFavDetail?"
          component={ProductDetail}
        />
        <Route exact path="/user/favoritelist" component={FavoriteDetail} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/chat/:groupID?" component={Chat} />
        <Route exact path="/myAccount/myProfile" component={MyProfile} />
        <Route
          exact
          path="/myAccount/myProfileForm"
          component={MyProfileForm}
        />
      </Auth>
      <Route path="*">{<div>ページが見つかりません！（簡易版）</div>}</Route>
    </Switch>
  );
};

export default Router;
