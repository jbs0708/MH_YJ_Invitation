import React, { useEffect } from 'react';

function KakaoMap() {

  useEffect(() => {
    // Kakao Maps API가 로드되었는지 확인
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=95ebee5e2635d8c256e3a2e4eba24364&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(36.899560, 127.523191),
          level: 4
        };
        const map = new window.kakao.maps.Map(container, options);

        // 마커 위치
        let markerPosition = new window.kakao.maps.LatLng(36.899560, 127.523191);

        // 마커 생성
        let marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });

        // 마커 표시
        marker.setMap(map);
      });
    };

    return () => {
      // Clean up script when component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div id="map" style={{
      width: '90%',
      height: '250px',
      borderColor: '#949494',
      borderWidth: '1px',
      borderStyle:'solid',
      marginBottom: '20px',
    }}></div>
  )
}

export default KakaoMap;
