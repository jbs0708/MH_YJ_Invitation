// KakaoShare.js
import React from 'react';
import '../styles/KakaoShare.css'; // CSS 파일을 import 합니다.
import KakaoIcon from '../icon/kakaotalk.png';

function KakaoShare() {
  const kakoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('95ebee5e2635d8c256e3a2e4eba24364');
    }

    window.Kakao.Share.sendScrap({
      requestUrl: 'https://jbs0708.github.io',
      templateId: 113582,
    });
  };

  return (
    <button
      onClick={kakoShare}
      className="kakao-share-button" // 클래스명 적용
    >
      <img
        src={KakaoIcon}
        alt="Kakao Icon" // 접근성을 위한 alt 속성 유지
      />
      <span>카카오톡 공유하기</span>
    </button>
  );
}

export default KakaoShare;
