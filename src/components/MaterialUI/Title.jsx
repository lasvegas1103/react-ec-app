import { Typography } from "@mui/material";

/**
 * タイトル表示
 * @param {*} props
 * @returns
 */
const Title = (props) => {
  return (
    <Typography
      component={props.component}
      variant={props.variant}
      color={props.color}
      sx={{ width: "90%", margin: "0 auto", paddingLeft: "25px" }}
    >
      {props.title}
    </Typography>
  );
};
export default Title;
