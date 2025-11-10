import { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { HospitalParsed } from '@/types/hospital';

interface HospitalMapProps {
  hospitals: HospitalParsed[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

// 카카오맵 API 키
const KAKAO_MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || 'ca6753f95409db0f45755c0085d293f5';

export function HospitalMap({ hospitals }: HospitalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 카카오맵 SDK 로드
  useEffect(() => {
    console.log('카카오맵 컴포넌트 마운트됨');
    console.log('카카오맵 API 키:', KAKAO_MAP_KEY);
    console.log('환경 변수:', process.env.NEXT_PUBLIC_KAKAO_MAP_KEY);

    // 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      console.log('카카오맵 SDK 이미 로드됨');
      setIsScriptLoaded(true);
      return;
    }

    // 카카오맵 API 키가 없으면 로드하지 않음
    if (!KAKAO_MAP_KEY) {
      console.error('카카오맵 API 키가 없습니다!');
      return;
    }

    console.log('카카오맵 스크립트 로드 시작...');
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      console.log('카카오맵 스크립트 로드 완료');
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          console.log('카카오맵 라이브러리 초기화 완료');
          setIsScriptLoaded(true);
        });
      } else {
        console.error('window.kakao가 정의되지 않음');
      }
    };

    script.onerror = (error) => {
      console.error('카카오맵 스크립트 로드 실패:', error);
    };

    document.head.appendChild(script);

    return () => {
      // 클린업: 스크립트 제거하지 않음 (재사용)
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    console.log('지도 초기화 시도:', { isScriptLoaded, hasMapRef: !!mapRef.current, hasMap: !!map });

    if (!isScriptLoaded) {
      console.log('스크립트 아직 로드 안됨');
      return;
    }

    if (!mapRef.current) {
      console.log('맵 레퍼런스 없음');
      return;
    }

    if (map) {
      console.log('맵 이미 초기화됨');
      return;
    }

    try {
      console.log('카카오맵 생성 시작...');
      const options = {
        center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
        level: 8,
      };

      const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
      console.log('카카오맵 생성 완료!', kakaoMap);
      setMap(kakaoMap);
    } catch (error) {
      console.error('카카오맵 생성 실패:', error);
    }
  }, [isScriptLoaded, map]);

  // 병원 마커 추가
  useEffect(() => {
    console.log('마커 추가 시도:', { hasMap: !!map, hospitalsCount: hospitals.length });

    if (!map || hospitals.length === 0) {
      console.log('맵 없음 또는 병원 데이터 없음');
      return;
    }

    try {
      const bounds = new window.kakao.maps.LatLngBounds();
      let hasValidLocation = false;
      let markerCount = 0;

      hospitals.forEach((hospital) => {
        if (hospital.위도 && hospital.경도) {
          hasValidLocation = true;
          markerCount++;

          const markerPosition = new window.kakao.maps.LatLng(
            hospital.위도,
            hospital.경도
          );

          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
            map: map,
          });

          // 인포윈도우
          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:8px 12px;font-size:14px;white-space:nowrap;">${hospital.병원명}</div>`,
          });

          // 마커 이벤트
          window.kakao.maps.event.addListener(marker, 'mouseover', () => {
            infowindow.open(map, marker);
          });

          window.kakao.maps.event.addListener(marker, 'mouseout', () => {
            infowindow.close();
          });

          bounds.extend(markerPosition);
        }
      });

      console.log(`마커 ${markerCount}개 추가 완료`);

      // 모든 마커가 보이도록 지도 범위 조정
      if (hasValidLocation) {
        map.setBounds(bounds);
        console.log('지도 범위 조정 완료');
      } else {
        console.log('위치 정보 있는 병원 없음');
      }
    } catch (error) {
      console.error('마커 추가 실패:', error);
    }
  }, [map, hospitals]);

  // 카카오맵 API 키가 없을 때 표시
  if (!KAKAO_MAP_KEY) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-[#287dff]" />
          <h2>병원 위치</h2>
        </div>
        <div className="bg-gray-100 rounded-xl h-96 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
            <p>카카오맵 API 키를 설정하면</p>
            <p>병원 위치를 지도에서 확인할 수 있습니다.</p>
            <p className="text-sm mt-2">(환경 변수: KAKAO_MAP_KEY)</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-6 h-6 text-[#287dff]" />
        <h2>병원 위치</h2>
      </div>
      <div ref={mapRef} className="w-full h-96 rounded-xl overflow-hidden" />
      <p className="text-sm text-gray-500 mt-3">
        마커에 마우스를 올리면 병원명을 확인할 수 있습니다.
      </p>
    </div>
  );
}