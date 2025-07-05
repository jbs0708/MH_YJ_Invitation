// index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import "./styles/WeddingPage.css";
import WeddingPage from './views/WeddingPage.js';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import GalleryPage from './views/GalleryPage.js';
import Modal from 'react-modal';
import KakaoShare from './components/KakaoShare'; // KakaoShare 컴포넌트 임포트

Modal.setAppElement('#root');

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<WeddingPage />} />
      <Route path="/gallery" element={<GalleryPage />} />
      <Route path="/share" element={<KakaoShare />} />
    </Routes>
  );
};

// Select the root DOM node
const container = document.getElementById('root');

// Create a root.
const root = createRoot(container);

// Kakao SDK 로드 및 초기화 함수
const loadKakaoSDK = () => {
  return new Promise((resolve, reject) => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init('95ebee5e2635d8c256e3a2e4eba24364');
      }
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init('95ebee5e2635d8c256e3a2e4eba24364');
        resolve();
      } else {
        reject(new Error('Kakao SDK 로드 실패'));
      }
    };
    script.onerror = () => reject(new Error('Kakao SDK 로드 실패'));
    document.head.appendChild(script);
  });
};

// Kakao SDK 로드 후 애플리케이션 렌더링
loadKakaoSDK().then(() => {
  console.log('Kakao SDK 초기화 완료');
  root.render(
    <React.StrictMode>
      <Router>
        <Root />
      </Router>
    </React.StrictMode>
  );
}).catch((error) => {
  console.error(error);
});
