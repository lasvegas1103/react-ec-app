import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

/**
 * 商品一覧のコマ
 * @param object 商品情報
 * @returns　商品情報のコマ
 */
const ProductCard = ({ productData }) => {
  return (
    <Card>
      <CardActionArea component={Link} to={`/product/detail/${productData.id}`}>
        <StyledCardMedia>
          <StyledImage
            src={productData?.images[0]?.path}
            title={productData.title}
            alt="商品画像"
          />
        </StyledCardMedia>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {productData.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="div">
            ¥{productData.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;

/* CSS */
const StyledImage = styled("img")({
  height: "200",
  width: "auto",
  maxWidth: "100%",
  maxHeight: "100%",
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
});

const StyledCardMedia = styled(CardMedia)({
  height: "200px",
  position: "relative",
  margin: "0",
});
