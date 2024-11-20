// ProductCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import styles from './ProductCarousel.module.css';

const ProductCarousel = ({ images = [] }) => {
  return (
    <div className={styles.carouselContainer}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        navigation 
        pagination={{ clickable: true }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
      >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide key={index} className={styles.slide}>
              <img src={image} alt={`Slide ${index + 1}`} className={styles.image} />
            </SwiperSlide>
          ))
        ) : (
          <p>No images available</p> // Mensaje si no hay imágenes
        )}
      </Swiper>
    </div>
  );
};

export default ProductCarousel;
