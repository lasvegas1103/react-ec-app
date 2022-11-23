import { useState } from "react";
import { usePagination } from "react-instantsearch-hooks-web";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

/**
 * algplia1のページネーションコンポーネント
 * @returns algolia Pagination
 */
export default function CustomPagination() {
  const [page, setPage] = useState(1);
  const { nbPages, refine } = usePagination();

  const handleOnChange = (e, page) => {
    setPage(page);
    refine(page - 1); // algoliaのindexが０から始まるから「−１」する
  };

  return (
    <StyledBox>
      <Stack spacing={2}>
        <StyledPagination
          count={nbPages}
          page={page}
          onChange={handleOnChange}
          defaultPage={1}
          showFirstButton
          showLastButton
          color="primary"
        />
      </Stack>
    </StyledBox>
  );
}

/* CSS */
const StyledPagination = styled(Pagination)(({ theme }) => ({
  display: "inline-block",
  padding: theme.spacing(1),
  float: "left",
  borderRadius: "20px 20px 20px 20px",
}));

const StyledBox = styled(Box)(() => ({
  width: "95%",
  textAlign: "left",
  position: "fixed",
  bottom: 10,
  right: 10,
}));
