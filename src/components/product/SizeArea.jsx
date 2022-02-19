import TextInput from "./TextInput";
import TextSelect from "./TextSelect";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";

const SizeArea = (props) => {
  return (
    <div aria-label="サイズ展開">
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>サイズ</TableCell>
              <TableCell>数量</TableCell>
              <TableCell />
              <TableCell />
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.sizes?.length > 0 &&
              props.sizes.map((item, index) => (
                <TableRow key={item.size}>
                  <TableCell component="th" scope="row">
                    {item.size}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                    //   onClick={}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                    //   onClick={}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextSelect
            name={"sizeType"}
            control={props.control}
            label={"サイズ"}
            fullWidth={true}
            rules={{
              required: "サイズを入力してください。",
            }}
          />
          <TextInput
            name={"quantity"}
            control={props.control}
            label={"数量"}
            type={"number"}
            maxRows={1}
            multiline={false}
            fullWidth={true}
            rules={{
              required: "数量を入力してください。",
            }}
          />
        </div>
        <IconButton
        //   onClick={}
        >
          <CheckCircleIcon />
        </IconButton>
      </TableContainer>
    </div>
  );
};

export default SizeArea;
