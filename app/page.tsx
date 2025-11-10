'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Activity, TrendingUp, MapPin, Loader2, AlertCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { HospitalCard } from '@/components/HospitalCard';
import { HospitalMap } from '@/components/HospitalMap';
import { getRealTimeBedInfo, parseBedInfo, searchHospitalLocation } from '@/lib/api';
import { HospitalParsed } from '@/types/hospital';

export default function HomePage() {
  const [hospitals, setHospitals] = useState<HospitalParsed[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<HospitalParsed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({ stage1: '', stage2: '' });

  // 통계 계산
  const stats = {
    totalHospitals: filteredHospitals.length,
    totalBeds: filteredHospitals.reduce(
      (sum, h) => sum + h.응급실_일반 + h.응급실_소아 + h.응급실_야간,
      0
    ),
    hospitalsWithBeds: filteredHospitals.filter(
      (h) => h.응급실_일반 + h.응급실_소아 + h.응급실_야간 > 0
    ).length,
  };

  // 데이터 불러오기
  const fetchHospitals = async () => {
    try {
      setLoading(true);
      setError(null);
      const { items } = await getRealTimeBedInfo(region.stage1, region.stage2, 100);
      const parsed = items.map(parseBedInfo);

      // 먼저 병원 목록 표시
      setHospitals(parsed);
      setFilteredHospitals(parsed);
      setLoading(false);

      // 백그라운드에서 위치 정보 점진적으로 가져오기 (처음 30개만)
      const hospitalsToEnrich = parsed.slice(0, 30);
      const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

      for (let i = 0; i < hospitalsToEnrich.length; i++) {
        const hospital = hospitalsToEnrich[i];

        if (!hospital.위도 || !hospital.경도) {
          const location = await searchHospitalLocation(hospital.병원명);

          if (location) {
            // 위치 정보를 가진 병원으로 업데이트
            setHospitals((prev) =>
              prev.map((h) =>
                h.기관ID === hospital.기관ID
                  ? { ...h, 위도: location.lat, 경도: location.lon }
                  : h
              )
            );
            setFilteredHospitals((prev) =>
              prev.map((h) =>
                h.기관ID === hospital.기관ID
                  ? { ...h, 위도: location.lat, 경도: location.lon }
                  : h
              )
            );
          }

          // Rate limiting: 500ms 딜레이
          await delay(500);
        }
      }
    } catch (err) {
      console.error('데이터 로드 실패:', err);
      setError('데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, [region]);

  // 검색 필터링
  useEffect(() => {
    let filtered = hospitals;

    if (searchQuery) {
      filtered = filtered.filter((hospital) =>
        hospital.병원명.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHospitals(filtered);
  }, [searchQuery, hospitals]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#287dff] to-[#417dff] text-white pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 md:mb-12"
          >
            <h1 className="mb-3 md:mb-4">실시간 응급실 병상 현황</h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto">
              전국 응급의료기관의 실시간 병상 정보를 한눈에 확인하세요
            </p>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4"
            >
              <Activity className="w-6 h-6 md:w-8 md:h-8 mb-2 mx-auto" />
              <div className="text-xl md:text-3xl mb-1">{stats.totalHospitals}</div>
              <div className="text-xs md:text-sm text-white/80">등록 병원</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4"
            >
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 mb-2 mx-auto" />
              <div className="text-xl md:text-3xl mb-1">{stats.totalBeds}</div>
              <div className="text-xs md:text-sm text-white/80">가용 병상</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4"
            >
              <MapPin className="w-6 h-6 md:w-8 md:h-8 mb-2 mx-auto" />
              <div className="text-xl md:text-3xl mb-1">{stats.hospitalsWithBeds}</div>
              <div className="text-xs md:text-sm text-white/80">병상 보유</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            onRegionChange={(stage1, stage2) => setRegion({ stage1, stage2 })}
          />
        </div>

        {/* Map */}
        <HospitalMap hospitals={filteredHospitals} />

        {/* Hospital List */}
        <div>
          <h2 className="mb-6">
            병원 목록
            <span className="text-[#287dff] ml-2">({filteredHospitals.length})</span>
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-[#287dff] animate-spin mb-4" />
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
              <h3 className="text-red-800 mb-2">오류가 발생했습니다</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchHospitals}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                다시 시도
              </button>
            </div>
          ) : filteredHospitals.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-12 text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-gray-700 mb-2">검색 결과가 없습니다</h3>
              <p className="text-gray-500">다른 조건으로 검색해보세요.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredHospitals.map((hospital, index) => (
                <HospitalCard key={hospital.기관ID} hospital={hospital} index={index} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-600">
          <p className="text-sm">
            데이터 출처: 국립중앙의료원 (공공데이터포털)
          </p>
          <p className="text-sm mt-2">
            © 2025 응급실 병상 찾기. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
