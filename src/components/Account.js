// Account.js

import React, { useState, useRef } from 'react';
import '../styles/Account.css';
import {
  GROOM_NAME,
  GROOM_ACCOUNT_NUMBER,
  GROOM_FATHER_NAME,
  GROOM_FATHER_ACCOUNT_NUMBER,
  GROOM_MOTHER_NAME,
  GROOM_MOTHER_ACCOUNT_NUMBER,
  GROOM_KAKAOPAY,
  GROOM_FATHER_KAKAOPAY,
  GROOM_MOTHER_KAKAOPAY,
  BRIDE_NAME,
  BRIDE_ACCOUNT_NUMBER,
  BRIDE_FATHER_NAME,
  BRIDE_FATHER_ACCOUNT_NUMBER,
  BRIDE_MOTHER_NAME,
  BRIDE_MOTHER_ACCOUNT_NUMBER,
  BRIDE_KAKAOPAY,
  BRIDE_FATHER_KAKAOPAY,
  BRIDE_MOTHER_KAKAOPAY
} from '../config.js';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyIcon from '../svg/copy.svg'; // 복사 아이콘 경로 확인
import up from '../svg/up.svg';
import down from '../svg/down.svg';
import kakaoPay from '../icon/KakaoPay.jpg';

const Account = () => {
  const [isGroomOpen, setIsGroomOpen] = useState(false);
  const [isBrideOpen, setIsBrideOpen] = useState(false);

  const groomRef = useRef(null);
  const brideRef = useRef(null);

  const toggleGroom = () => {
    setIsGroomOpen((prev) => !prev);
  };

  const toggleBride = () => {
    setIsBrideOpen((prev) => !prev);
  };

  const handleCopy = () => {
    // alert('계좌번호가 클립보드에 복사되었습니다!');
  };

  const handleKakaoPay = (kakaoPayUrl) => {
    if (kakaoPayUrl.trim() !== "") {
      window.open(kakaoPayUrl);
    } else {
      alert('해당 계좌의 카카오페이 정보가 없습니다.');
    }
  };

  const groomAccounts = [
    { name: GROOM_NAME, accountNumber: GROOM_ACCOUNT_NUMBER, kakaoPay: GROOM_KAKAOPAY },
    { name: GROOM_FATHER_NAME, accountNumber: GROOM_FATHER_ACCOUNT_NUMBER, kakaoPay: GROOM_FATHER_KAKAOPAY },
    { name: GROOM_MOTHER_NAME, accountNumber: GROOM_MOTHER_ACCOUNT_NUMBER, kakaoPay: GROOM_MOTHER_KAKAOPAY }
    
  ];

  const brideAccounts = [
    { name: BRIDE_NAME, accountNumber: BRIDE_ACCOUNT_NUMBER, kakaoPay: BRIDE_KAKAOPAY },
    { name: BRIDE_FATHER_NAME, accountNumber: BRIDE_FATHER_ACCOUNT_NUMBER, kakaoPay: BRIDE_FATHER_KAKAOPAY },
    { name: BRIDE_MOTHER_NAME, accountNumber: BRIDE_MOTHER_ACCOUNT_NUMBER, kakaoPay: BRIDE_MOTHER_KAKAOPAY },
  ];

  // 필터링된 계좌 목록
  const filteredGroomAccounts = groomAccounts.filter(account => account.name.trim() !== "");
  const filteredBrideAccounts = brideAccounts.filter(account => account.name.trim() !== "");

  return (
    <div className="account-container">
      {/* 신랑측 */}
      <div className="account-section" ref={groomRef}>
        <button
          type="button" // 버튼 타입 명시
          className={`account-toggle-button ${isGroomOpen ? 'open' : ''}`}
          onClick={toggleGroom}
          aria-expanded={isGroomOpen}
        >
          <span className="button-text">신랑측 계좌 안내</span>
          <img
            src={down}
            alt="toggle"
            className="toggle-icon"
          />
        </button>
        <div className={`accounts-list ${isGroomOpen ? 'open' : 'closed'}`}>
          {filteredGroomAccounts.map((account, index) => (
            <div className="account-item" key={index}>
              {/* 첫 번째 div: 이름과 계좌번호 */}
              <div className="account-info">
                <span className="account-name">{account.name}</span>
                <span className="account-number">{account.accountNumber}</span>
              </div>
              {/* 두 번째 div: 카카오페이 버튼과 복사 버튼 */}
              <div className="account-actions">
                {account.kakaoPay.trim() !== "" && (
                  <button
                    type="button" // 버튼 타입 명시
                    className="kakao-pay-button"
                    onClick={() => handleKakaoPay(account.kakaoPay)}
                  >
                    <img src={kakaoPay} alt="카카오페이" className="kakaoPay-icon" />
                  </button>
                )}
                <CopyToClipboard text={account.accountNumber} onCopy={handleCopy}>
                  <button type="button" className="copy-button">
                    <img src={copyIcon} alt="복사" className="copy-icon" />
                    복사
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 신부측 */}
      <div className="account-section" ref={brideRef}>
        <button
          type="button" // 버튼 타입 명시
          className={`account-toggle-button ${isBrideOpen ? 'open' : ''}`}
          onClick={toggleBride}
          aria-expanded={isBrideOpen}
        >
          <span className="button-text">신부측 계좌 안내</span>
          <img
            src={down}
            alt="toggle"
            className="toggle-icon"
          />
        </button>
        <div className={`accounts-list ${isBrideOpen ? 'open' : 'closed'}`}>
          {filteredBrideAccounts.map((account, index) => (
            <div className="account-item" key={index}>
              {/* 첫 번째 div: 이름과 계좌번호 */}
              <div className="account-info">
                <span className="account-name">{account.name}</span>
                <span className="account-number">{account.accountNumber}</span>
              </div>
              {/* 두 번째 div: 카카오페이 버튼과 복사 버튼 */}
              <div className="account-actions">
                {account.kakaoPay.trim() !== "" && (
                  <button
                    type="button" // 버튼 타입 명시
                    className="kakao-pay-button"
                    onClick={() => handleKakaoPay(account.kakaoPay)}
                  >
                    <img src={kakaoPay} alt="카카오페이" className="kakaoPay-icon" />
                  </button>
                )}
                <CopyToClipboard text={account.accountNumber} onCopy={handleCopy}>
                  <button type="button" className="copy-button">
                    <img src={copyIcon} alt="복사" className="copy-icon" />
                    복사
                  </button>
                </CopyToClipboard>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Account;
