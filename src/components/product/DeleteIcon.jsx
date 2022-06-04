import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";

const DeleteIcon = (props) => {
  return (
    <DoDisturbOnIcon
      fontSize={props.fontSize}
      color={props.color}
      onClick={props.func}
    />
  );
};

export default DeleteIcon;
