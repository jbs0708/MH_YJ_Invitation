// src/components/Carousel.js
import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Thumbs } from 'swiper/modules'; // Swiper에서 직접 모듈 가져오기
import 'swiper/css';
import '../styles/Carousel.css';

const Carousel = () => {
  const publicPath = process.env.PUBLIC_URL;
  const galleryImages = Array.from({ length: 10 }, (_, i) => `${publicPath}/assets/picture/carousel_${i + 1}.jpg`);

  // 현재 슬라이드 인덱스 관리
  const [currentIndex, setCurrentIndex] = useState(0);

  // Swiper 인스턴스 참조
  const swiperRef = useRef(null);

  // 점 클릭 시 해당 슬라이드로 이동하는 함수
  const handleDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideToLoop(index);
    }
  };

  // 이전 슬라이드로 이동
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  // 다음 슬라이드로 이동
  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  // 이미지 클릭 시 위치에 따라 슬라이드 이동
  const handleImageClick = (e) => {
    const { left, width } = e.target.getBoundingClientRect();
    const clickX = e.clientX - left;

    if (clickX < width / 2) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  return (
    <div className="carousel-container">
      {/* 메인 캐러셀 */}
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Thumbs]}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        initialSlide={0}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        className="mySwiper mainSwiper"
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
      >
        {galleryImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img
                src={image}
                alt={`Wedding Pic ${index + 1}`}
                className="carousel-image"
                loading="lazy"
                onClick={handleImageClick} // 클릭 핸들러 추가
                onContextMenu={(e) => e.preventDefault()} // 오른쪽 클릭 비활성화
                draggable="false" // 드래그 방지
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 점(Point) 인디케이터 */}
      <div className="carousel-dots">
        {galleryImages.map((_, index) => (
          <div
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
