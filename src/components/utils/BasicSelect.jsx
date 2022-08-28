import { NativeSelect, InputLabel, FormControl } from "@mui/material";

/**
 * 数量選択
 * @param {*} param0
 * @returns
 */
const BasicSelect = ({ func, cnt, name, uniqueName, defaultValue }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {name}
      </InputLabel>
      <NativeSelect
        defaultValue={defaultValue}
        inputProps={{
          name: name,
          id: "uncontrolled-native",
        }}
        onChange={func}
      >
        {(function () {
          const list = [];
          for (let i = 1; i < cnt; i++) {
            list.push(
              <option key={uniqueName + i} value={i}>
                {i}
              </option>
            );
          }
          return list;
        })()}
      </NativeSelect>
    </FormControl>
  );
};

export default BasicSelect;
