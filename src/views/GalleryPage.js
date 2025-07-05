// src/pages/GalleryPage.js
import React, { useState } from 'react';
import '../styles/GalleryPage.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const GalleryPage = () => {
  const navigate = useNavigate();

  const publicPath = process.env.PUBLIC_URL;

  const galleryImages = Array.from({ length: 37 }, (_, i) =>
    `${publicPath}/assets/picture/weddingPic_${i + 1}.jpg`
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };
  const closeModal = () => setModalIsOpen(false);
  const goBack = () => navigate(-1);

  return (
    <div className="gallery-page">
      <button className="back-button" onClick={goBack}>
        &#8592; 뒤로가기
      </button>
      <div className="image-grid">
        {galleryImages.map((src, idx) => (
          <div key={idx} className="image-item" onClick={() => openModal(idx)}>
            <img
              src={src}
              alt={`Wedding Pic ${idx + 1}`}
              loading="lazy"
              onError={e => (e.target.style.display = 'none')}
            />
          </div>
        ))}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <div className="modal-content">
          <Swiper
            modules={[Navigation]}
            initialSlide={currentIndex}
            onSlideChange={sw => setCurrentIndex(sw.activeIndex)}
            navigation
            allowTouchMove
            className="swiper-container"
          >
            {galleryImages.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt={`Wedding Pic ${idx + 1}`}
                  className="modal-image"
                  onError={e => (e.target.style.display = 'none')}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Modal>
    </div>
  );
};

export default GalleryPage;
