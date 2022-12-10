import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useInstantSearch } from "react-instantsearch-hooks-web";
import { useQueryClient } from "react-query";
import { useUserFavCntQuery } from "../../hooks/userHooks";
import { useUserCartCntQuery } from "../../hooks/userHooks";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CustomSearchBox from "../algolia/CustomSearchBox";

/**
 * ヘッダー（ログイン）
 * @returns
 */
const Header = () => {
  const history = useHistory();
  // キャッシュからUID取得
  const queryClient = useQueryClient();
  const loginData = queryClient.getQueryData("loginData");
  // お気に入り件数取得
  const { getUserFavoriteCnt } = useUserFavCntQuery({ uid: loginData?.uid });
  // カート件数取得
  const { getUserCartCnt } = useUserCartCntQuery({ uid: loginData?.uid });
  // algolia
  const { setUiState } = useInstantSearch();

  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // プロフィールメニューを開く
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // プロフィールメニュー > メニューを閉じる
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // ロゴからトップページへ遷移
  const handleTopPageClick = () => {
    setUiState({}); // 検索結果リセット
    history.push("/product/list/");
  };

  const menuId = "primary-search-account-menu";
  // プロフィールメニュー
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => history.push("/myAccount/myProfile")}>
        登録情報
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>ログアウト</MenuItem>
    </Menu>
  );

  return (
    <Box>
      <ThemeProvider theme={theme}>
        <AppBar position="fixed">
          <Toolbar>
            {/*  サイト名 */}
            <Typography
              variant="h6"
              noWrap
              component={Link}
              // to={"/product/list/"}
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                  textDecoration: "none",
                  color: "black",
                },
              }}
              onClick={handleTopPageClick}
            >
              ECサイト（仮）
            </Typography>
            {/*  検索 */}
            <CustomSearchBox />
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", sm: "flex", md: "flex" } }}>
              {/*  カートアイコン */}
              <IconButton
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
                onClick={() => history.push("/cart")}
              >
                <Badge badgeContent={getUserCartCnt.data} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              {/*  お気に入りアイコン */}
              <IconButton
                size="large"
                aria-label="show 3 new notifications"
                color="inherit"
                onClick={() => history.push("/user/favoritelist/")}
              >
                <Badge badgeContent={getUserFavoriteCnt.data} color="error">
                  <FavoriteIcon />
                </Badge>
              </IconButton>
              {/*  アカウントアイコン */}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMenu}
      </ThemeProvider>
    </Box>
  );
};

export default Header;

/* CSS */
const theme = createTheme({
  palette: {
    primary: {
      main: "#EEEEEE",
      contrastText: "#333333",
    },
  },
});
