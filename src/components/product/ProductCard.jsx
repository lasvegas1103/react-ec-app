import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const productData = props.productData;
  return (
    <Card sx={{ height: 300, width: 200, maxWidth: 350, minWidth: 150 }}>
      <CardActionArea component={Link} to={`/product/detail/${productData.id}`}>
        <CardMedia
          component="img"
          height="200px"
          image={productData?.images[0]?.path}
          title={productData.title}
          alt="商品画像"
        />
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
