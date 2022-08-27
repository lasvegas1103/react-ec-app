import { Typography } from "@mui/material";

/**
 * 会社名表示
 * @param {*} props
 * @returns
 */
const CompanyTitle = (props) => {
  return (
    <Typography
      component={props.component}
      variant={props.variant}
      color={props.color}
      sx={{
        position: "absolute",
        margin: "4rem auto 0",
        padding: "3px 0 3px 25px",
        left: "0",
        right: "0",
        borderBottom: "solid 1px lightgray",
      }}
    >
      {props.title}
    </Typography>
  );
};
export default CompanyTitle;
