import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

const ProductCard = (props) => {
  const productData = props.productData;
  console.log(productData);
  return (
    <Card>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140px"
          image={productData?.images[0]?.path}
          title={productData.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {productData.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {productData.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ProductCard;
