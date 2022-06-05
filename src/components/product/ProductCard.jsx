import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const Cimage = styled("img")({
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

const CCardMedia = styled(CardMedia)({
  height: "200px",
  position: "relative",
  margin: "0",
});

const ProductCard = (props) => {
  const productData = props.productData;
  return (
    <Card sx={{ height: 300, width: 200, maxWidth: 350, minWidth: 150 }}>
      <CardActionArea component={Link} to={`/product/detail/${productData.id}`}>
        <CCardMedia>
          <Cimage
            src={productData?.images[0]?.path}
            title={productData.title}
            alt="商品画像"
          />
        </CCardMedia>
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
