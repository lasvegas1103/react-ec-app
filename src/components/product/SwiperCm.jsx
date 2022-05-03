import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "../../style.css";

/* 商品詳細-画像スライド */
const SwiperCm = (props) => {
  return (
    <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
      {props.images?.length > 0 &&
        props.images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.path} alt="商品画像" />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SwiperCm;
