import { useState } from "react";
import TextInput from "./TextInput";
import TextSelect from "./TextSelect";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";

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

const C_IconButton = styled(IconButton)({
  float: "right",
});

const SizeArea = (props) => {
  const [sizes, setSizes] = useState([]);
  const [currencies, setCurrencies] = useState([
    {
      key: "S",
      value: "S",
    },
    {
      key: "M",
      value: "M",
    },
    {
      key: "L",
      value: "L",
    },
    {
      key: "XL",
      value: "XL",
    },
  ]);

  const handleClickAdd = () => {
    let sizeType = props.getValues("sizeType");
    let quantity = props.getValues("quantity");

    // 選択していたサイズをstateに追加
    setSizes([
      ...sizes,
      {
        sizeType: sizeType,
        quantity: quantity,
      },
    ]);
    props.setValue("sizeType", "");
    props.setValue("quantity", "");

    // 選択していたサイズをプルダウンから削除
    let newCurrencies = currencies.filter((currency) => {
      return currency.key !== sizeType;
    }, sizeType);

    setCurrencies(newCurrencies);
  };

  const handleClickDelete = (selectedSizeType) => {
    // 選択していたサイズをstateから削除
    let newSizes = sizes.filter((size) => {
      return size.sizeType !== selectedSizeType;
    }, selectedSizeType);
    setSizes(newSizes);

    // 選択していたサイズをプルダウンに復活させる
    setCurrencies([
      ...currencies,
      {
        key: selectedSizeType,
        value: selectedSizeType,
      },
    ]);
  };

  return (
    <div aria-label="サイズ展開">
      <TableContainer component={Paper}>
        <Table aria-label="caption table">
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
            {sizes?.length > 0 &&
              sizes.map((item, index) => (
                <TableRow key={item.sizeType}>
                  <TableCell component="th" scope="row">
                    {item.sizeType}
                  </TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleClickDelete(item.sizeType)}
                    >
                      <RemoveCircleIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <div>
          <TextSelect
            currencies={currencies}
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
        <C_IconButton onClick={handleClickAdd}>
          <CheckCircleIcon />
        </C_IconButton>
      </TableContainer>
    </div>
  );
};

export default SizeArea;
