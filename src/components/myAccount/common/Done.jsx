import { memo } from "react";
import { Link as LinkR } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Link } from "@mui/material";

/**
 * マイプロフィールメイン(完了画面)
 */
const MyProfileDone = memo(() => {
  return (
    <div>
      <StyledP>会員登録情報の変更が完了しました。</StyledP>
      <StyledDiv>
        <Link
          component={LinkR}
          to={"/myAccount/myProfile"}
          variant="body2"
          sx={{ justifyContent: "center" }}
        >
          登録情報トップへ
        </Link>
      </StyledDiv>
    </div>
  );
});

export default MyProfileDone;

/* CSS */
const StyledDiv = styled("div")(() => ({
  textAlign: "center",
}));

const StyledP = styled("p")(() => ({
  marginTop: "25px",
  textAlign: "center",
}));
