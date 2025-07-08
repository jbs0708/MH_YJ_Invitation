// KakaoShare.js
import React from 'react';
import '../styles/KakaoShare.css';
import KakaoIcon from '../icon/kakaotalk.png';

function KakaoShare() {
  const kakoShare = () => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('9231a409e3ef488e46f59b7a5f3f787c');
    }

    window.Kakao.Share.sendScrap({
      requestUrl: 'https://jbs0708.github.io',
      templateId: 122242,
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
