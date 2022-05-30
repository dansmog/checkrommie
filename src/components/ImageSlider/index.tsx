// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import "./imageslider.styles.css";

// import required modules
import { EffectFade, Navigation } from "swiper";

export default function ImageSlider({ medias }: { medias: any }) {
  console.log(medias)
  return (
    <>
      <Swiper
        effect={"fade"}
        navigation={true}
        modules={[EffectFade, Navigation]}
        className="mySwiper"
      >
        {medias.map((media: { id: string; url: string; name: string }) => (
          <SwiperSlide key={media?.id}>
            <img
              key={media?.id}
              src={media?.url}
              alt={`apartment media ${media?.name}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
