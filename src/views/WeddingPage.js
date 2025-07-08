import React, { useState, useRef, useEffect } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import "../styles/WeddingPage.css";
import KakaoMap from "../components/KakaoMap.js";
import copy from "../svg/copy.svg";
import play from "../svg/play.svg";
import pause from "../svg/pause.svg";
import Carousel from "../components/Carousel.js";
import Account from "../components/Account.js";
import Calendar from "../components/Calendar.js";
import KakaoShare from "../components/KakaoShare.js";
import { useNavigate } from 'react-router-dom';
import { ADDRESS } from '../config.js';

import heart from '../icon/heart.png';
import pink_heart from '../icon/pink_heart.png';

const WeddingPage = () => {
  const navigate = useNavigate();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleWelcomeClose = () => {
    setShowWelcomeModal(false);

    const audio = audioRef.current;
    if (audio) {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("오디오 재생 실패:", err));
    }
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.error("오디오 재생 실패:", err));
    }
  };
  
  // 스크롤용 refs
  const invitationRef = useRef(null);
  const storyRef = useRef(null);
  const calendarRef = useRef(null);
  const galleryRef = useRef(null);
  const locationRef = useRef(null);
  const informationRef = useRef(null);
  const offset = 40;
  const scrollToSection = (ref) => {
    const el = ref.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const scrollToInvitation = () => scrollToSection(invitationRef);
  const scrollToStory      = () => scrollToSection(storyRef);
  const scrollToCalendar   = () => scrollToSection(calendarRef);
  const scrollToGallery    = () => scrollToSection(galleryRef);
  const scrollToLocation   = () => scrollToSection(locationRef);
  const scrollToInformation= () => scrollToSection(informationRef);

  // 스토리 모달 등 기타 상태
  const [isStoryVisible, setIsStoryVisible] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const openModal = (src, idx) => { setCurrentImage(src); setCurrentIndex(idx); setModalIsOpen(true); };
  const closeModal = () => { setModalIsOpen(false); setCurrentImage(''); setCurrentIndex(0); };
  const toggleStory = () => setIsStoryVisible(!isStoryVisible);
  const handleImageClick = () => navigate('/gallery');

  // 리소스 경로
  const publicPath = process.env.PUBLIC_URL;
  const images = {
    weddingPic1: `${publicPath}/assets/picture/weddingPic_1.jpg`,
    weddingPic2: `${publicPath}/assets/picture/weddingPic_2.jpg`,
    weddingPic18:`${publicPath}/assets/picture/weddingPic_18.jpg`,
    storyPic1:   `${publicPath}/assets/picture/storyPic_1.jpg`,
    storyPic2:   `${publicPath}/assets/picture/storyPic_2.jpg`,
    storyPic3:   `${publicPath}/assets/picture/storyPic_3.jpg`,
    storyPic4:   `${publicPath}/assets/picture/storyPic_4.jpg`,
    map:         `${publicPath}/assets/picture/map.png`,
  };
  const audioFile = `${publicPath}/assets/music/[MR]MH_YJ.mp3`;

  return (
    <div className="body">
      {showWelcomeModal && (
        <div
          className="welcome-modal-overlay"
          onClick={handleWelcomeClose}
        >
          <div
            className="welcome-modal"
            onClick={e => e.stopPropagation()}
          >
            <h2>
              초대합니다!<br/>
              <br/>
              민혁 ❤ 예진의<br/>
              부부로써 첫 걸음을<br/>
              🎉 축복해주세요! 🎉
            </h2>
            <button onClick={handleWelcomeClose}>
              축복하기
            </button>
          </div>
        </div>
      )}

      <audio ref={audioRef} loop preload="auto">
        <source src={audioFile} type="audio/mpeg" />
        브라우저가 오디오 태그를 지원하지 않습니다.
      </audio>


      {/* 네비게이션 */}
      <nav className="fixed-navbar">
        <div className="navbar-left">
          <button className="play-pause-button" onClick={togglePlayPause}>
            {isPlaying
              ? <img src={pause} alt="정지" style={{ width: 20 }} />
              : <img src={play}  alt="재생" style={{ width: 20 }} />
            }
          </button>
        </div>
        <div className="navbar-right">
          <button className="nav-button" onClick={scrollToStory}>스토리</button>
          {/* <span className="separator">|</span> */}
          <button className="nav-button" onClick={scrollToCalendar}>달력</button>
          {/* <span className="separator">|</span> */}
          <button className="nav-button" onClick={scrollToGallery}>갤러리</button>
          {/* <span className="separator">|</span> */}
          <button className="nav-button" onClick={scrollToLocation}>위치</button>
          {/* <span className="separator">|</span> */}
          <button className="nav-button" onClick={scrollToInformation}>안내</button>
        </div>
      </nav>

      {/* 오디오 엘리먼트 */}
      {/* <audio
        ref={audioRef}
        src={audioFile}
        type="audio/mp3"
        loop
        autoPlay
        muted
        playsInline 
      /> */}

      {/* Body Top */}
      <div className="body-top">
        <img src={images.weddingPic1} alt="wedding" />
      </div>

      {/* Invitation */}
      <div className="body-middle" ref={invitationRef}>
        <div className="section-title-invitation"><h1>초 대</h1></div>
        <div className="main-word">
          <h4>유민혁ㆍ이예진</h4>
          <div className="location">
            <h4>2025. 08. 23 토요일 오전 11시</h4>
            <h4>우리컨벤션웨딩홀</h4>
          </div>
          <br />
          <p>
            하나님의 인도하심 속에서 <br/>
            저희 두 사람이 만나 함께 걸어가려 합니다. <br/>
            소중한 날, 여러분을 기쁨의 자리로 초대하오니<br/>
            함께해 주셔서 축복해 주세요 <img src={heart} alt="heart" style={{ width: '1.4rem', height: '1.45rem', verticalAlign: 'middle' }} /><br/>
          </p>
        </div>
      </div>

      {/* Footer 부모님 */}
      <div className="body-footer">
        <div className="row2">
          <span className="parents">유중환</span><span className="bulit">・</span><span className="parents">최옥순</span><p>의 아들</p><span className="groom">민혁</span>
        </div>
        <div className="row1">
          <span className="parents"></span><span className="parents">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;서수영</span><p>의 딸</p><span className="groom">&nbsp;&nbsp;예진</span>
        </div>
      </div>

      {/* Our Story */}
      <div className="our-story-section" ref={storyRef}>
        <div className="section-title"><h1>🎬 우리의 이야기</h1></div>
        <img className="our-story1-img" src={images.storyPic1} alt="story1" />
        <div className="our-story">
          <p>
            2016년, 고신대학교 16학번으로 처음 만나<br/>
            서로를 ‘동기’라 부르며 인사하던 사이였습니다. <br/>
            그런데 말입니다.<br/>
            예진이는 배려가 많고 유머러스한<br/>
            민혁이를 좋아했습니다.<br/>
            아니… 사랑했습니다.<br/>
            군대 가기 전까지 여자친구를 만나지 않겠다는!<br/>
            신념을 가진 민혁이는<br/>
            예진이의 고백을 거절하고 맙니다.<br/>
            천사를 놓쳐버린 거죠.
          </p>
        </div>

        <img className="our-story2-img" src={images.storyPic2} alt="story2" />
        <div className="our-story">
          <p>
            그렇게 휴학과 복수전공으로 인해<br/>
            만날 기회가 없었고,<br/>
            그로부터 오랜 시간이 흘렀습니다. 무려 3년이나.<br/>
            그러던 어느 날,<br/>
            다시 만나 서로의 이야기를 듣게 되었고,<br/>
            그리고 알게 되었습니다.<br/>
            <br/>
            비전도, 가치관도, 가고 싶은 길도 같다는 것을.<br/>
            무엇보다 서로 확신했습니다.<br/>
            누구보다 서로가 하나님을<br/>
            사랑하는 사람인 것을요.
          </p>
        </div>

        <div className="section-title"><h1><img src={pink_heart} alt="heart" style={{ width: '17%', height: 'auto', verticalAlign: 'middle' }} /> 우리들의 결심</h1></div>
        <img className="our-story3-img" src={images.storyPic3} alt="story3" />
        <div className="our-story">
          <p>
            고백 이후, 우리는 서로를 알아가는 시간 속에서<br/>
            많은 것을 배우고, 함께 기뻐하고,<br/>
            감동을 나누었습니다.<br/>
            때로는 함께 슬퍼하며 위로했고,<br/>
            서로에게 동역자가 되어 힘이 되어주었습니다.<br/>
            그 모든 시간을 지나며<br/>
            <br/>
            ‘이 사람은 하나님이 내게 주신 사람이구나’
            <br/>
            라는 확신이 마음에 자리 잡았습니다.<br/>
            그 확신을 품고, 이제  <br/>
            평생을 함께하기로 결심했습니다.
          </p>
        </div>
        
        <img className="our-story4-img" src={images.storyPic4} alt="story4" />
        <div className="our-story">
          <p>
            다가오는 8월 23일,<br/>
            신랑 유민혁과 신부 이예진이<br/>
            감동을 나누고자합니다.<br/>
            사랑과 믿음 안에서 하나 되어<br/>
            새로운 가정을 이루려 합니다.<br/>
            함께해 주셔서<br/>
            이 첫 걸음을 축복해 주신다면<br/>
            무엇보다 감사한 선물이 될 것입니다.<br/>
            기쁜 마음으로 기다리고 있겠습니다.<br/>
            우리의 시작에 따뜻한 동행이 되어 주세요.<br/>
          </p>
        </div>
      </div>

      {/* Calendar */}
      <div className="section-title" ref={calendarRef}><h1>달 력</h1></div>
      <Calendar />

      {/* Gallery */}
      <div className="section-title" ref={galleryRef}><h1>갤러리</h1></div>
      <Carousel />

      {/* Location */}
      <div className="section-title" ref={locationRef}><h1>위 치</h1></div>
      <KakaoMap />
      <div className="address">
        <h4>우리컨벤션웨딩홀 19층</h4>
        <h4>부산 동구 중앙대로 361번길 14</h4>
        <h4>DGB생명빌딩 19층(웨딩홀),20층(뷔페)</h4>
        <CopyToClipboard text={ADDRESS}>
          <button className="address-button">
            <img src={copy} alt="icon" style={{ width: 14, marginRight: 5 }} />
            주소 복사
          </button>
        </CopyToClipboard>
        <h4>주차안내</h4>
        <img src={images.map} alt="map" style={{ width: '100%', height: 'auto' }} />
      </div>
      <div className="parking-table-container">
        <table className="parking-table">
          <thead>
            <tr>
              <th>주차장명</th>
              <th>이용시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DGB생명빌딩 주차장</td>
              <td>
                (웨딩홀 이용 시)<br/>
                1시간 30분 무료<br/>
                (뷔페 이용 시)<br/>
                2시간 30분 무료<br/>
              </td>
            </tr>
            <tr>
              <td>부산주차장</td>
              <td>
                (웨딩홀 이용 시)<br/>
                1시간 무료<br/>
                (뷔페 이용 시)<br/>
                2시간 무료<br/> 
              </td>
            </tr>
            <tr>
              <td>범일그린 공영 주차장</td>
              <td>
                (뷔페 이용 시)<br/>
                2시간 무료
              </td>
            </tr>
            <tr>
              <td>동구청 외 인근 주차장</td>
              <td>1시간 무료</td>
            </tr>
          </tbody>
        </table>
        <p style={{ marginTop: '0.5rem', fontSize: '1.2rem', fontWeight: '600', color: '#282828' }}>
          * 주차장 이용 시 안내전화 051 - 636 - 7769
        </p>
      </div>


      {/* Information */}
      <div className="account-Box" ref={informationRef}>
        <div className="section-title"><h1>안 내</h1></div>
        <div className="info-title">마음 전하실 곳</div>
      </div>
      <Account />

      {/* Kakao Share */}
      <KakaoShare />
    </div>
  );
};

export default WeddingPage;
