import { useState } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";

/**
 * algplia1の検索BOXコンポーネント
 * @returns algolia SearchBox
 */
export default function CustomSearchBox() {
  const { query, refine, clear } = useSearchBox();
  const [value, setValue] = useState(query);

  const handleSearchClick = () => {
    refine(value);
  };

  const handleClearClick = () => {
    clear(value);
    setValue("");
  };

  const handleOnChange = (e) => {
    setValue(e.currentTarget.value);
  };

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Search>
        <StyledInputBase
          placeholder="アイテムを探す"
          inputProps={{ "aria-label": "search" }}
          value={value}
          onChange={handleOnChange}
        />
      </Search>
      <SearchIconWrapper onClick={handleSearchClick}>
        <SearchIcon />
      </SearchIconWrapper>
      <ClearIconWrapper onClick={handleClearClick}>
        <ClearIcon fontSize="small" />
      </ClearIconWrapper>
    </div>
  );
}

/** CSS */
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.5),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.7),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 4),
  height: "100%",
  position: "absolute",
  //   pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const ClearIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: "5px",
  "&:hover": {
    backgroundColor: "transparent",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  //   backgroundColor: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    paddingRight: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "350px",
    },
  },
}));
