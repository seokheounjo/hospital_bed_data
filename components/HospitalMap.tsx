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
const KAKAO_MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '';

export function HospitalMap({ hospitals }: HospitalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 카카오맵 SDK 로드
  useEffect(() => {
    // 이미 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      setIsScriptLoaded(true);
      return;
    }

    // 카카오맵 API 키가 없으면 로드하지 않음
    if (!KAKAO_MAP_KEY) {
      return;
    }

    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_KEY}&autoload=false`;
    script.async = true;

    script.onload = () => {
      window.kakao.maps.load(() => {
        setIsScriptLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      // 클린업: 스크립트 제거
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current || map) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
      level: 8,
    };

    const kakaoMap = new window.kakao.maps.Map(mapRef.current, options);
    setMap(kakaoMap);
  }, [isScriptLoaded, map]);

  // 병원 마커 추가
  useEffect(() => {
    if (!map || hospitals.length === 0) return;

    // 기존 마커 제거는 생략 (간단한 구현)
    
    const bounds = new window.kakao.maps.LatLngBounds();
    let hasValidLocation = false;

    hospitals.forEach((hospital) => {
      if (hospital.위도 && hospital.경도) {
        hasValidLocation = true;
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

    // 모든 마커가 보이도록 지도 범위 조정
    if (hasValidLocation) {
      map.setBounds(bounds);
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