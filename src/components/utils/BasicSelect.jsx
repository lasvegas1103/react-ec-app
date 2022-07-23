import { NativeSelect, InputLabel, FormControl } from "@mui/material";

const BasicSelect = ({ func, cnt, name, uniqueName }) => {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel variant="standard" htmlFor="uncontrolled-native">
        {name}
      </InputLabel>
      <NativeSelect
        defaultValue={1}
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
