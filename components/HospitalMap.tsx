'use client';

import { useEffect, useRef, useState } from 'react';
import { HospitalParsed } from '@/types/hospital';
import { MapPin } from 'lucide-react';

interface HospitalMapProps {
  hospitals: HospitalParsed[];
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KAKAO_MAP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY || '';

export default function HospitalMap({ hospitals }: HospitalMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  // 카카오맵 스크립트 로드
  useEffect(() => {
    if (window.kakao && window.kakao.maps) {
      setIsScriptLoaded(true);
      return;
    }

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
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  // 지도 초기화
  useEffect(() => {
    if (!isScriptLoaded || !mapRef.current) return;

    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.978), // 서울 시청
      level: 8,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  }, [isScriptLoaded]);

  // 병원 마커 추가 (위도/경도 데이터가 있을 때)
  useEffect(() => {
    if (!map || hospitals.length === 0) return;

    // 기존 마커 제거 로직은 생략 (실제 구현시 추가)

    hospitals.forEach((hospital) => {
      if (hospital.위도 && hospital.경도) {
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
          content: `<div style="padding:5px;font-size:12px;">${hospital.병원명}</div>`,
        });

        window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          infowindow.open(map, marker);
        });

        window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          infowindow.close();
        });
      }
    });
  }, [map, hospitals]);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
      <div className="bg-gradient-to-r from-[#287dff] to-[#417dff] p-4">
        <div className="flex items-center gap-2 text-white">
          <MapPin className="w-5 h-5" />
          <h2 className="text-lg font-bold">응급실 위치</h2>
        </div>
      </div>

      {/* 임시 지도 영역 (카카오맵 API 키 필요) */}
      <div className="relative">
        <div
          ref={mapRef}
          className="w-full h-[400px] bg-gray-100 flex items-center justify-center"
        >
          {!isScriptLoaded && (
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">지도를 불러오는 중...</p>
              <p className="text-sm text-gray-400 mt-2">
                카카오맵 API 키가 필요합니다
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 지도 안내 */}
      <div className="p-4 bg-[#eff6ff] border-t border-gray-200">
        <p className="text-sm text-gray-600">
          💡 <span className="font-semibold">참고:</span> 실제 지도 기능을 사용하려면
          카카오맵 API 키를 설정해주세요.
        </p>
      </div>
    </div>
  );
}
