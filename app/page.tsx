'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  TrendingUp,
  MapPin,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import HospitalCard from '@/components/HospitalCard';
import HospitalMap from '@/components/HospitalMap';
import { Hospital, HospitalParsed } from '@/types/hospital';
import { parseBedInfo } from '@/lib/api';

export default function Home() {
  const [hospitals, setHospitals] = useState<HospitalParsed[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<HospitalParsed[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState({ stage1: '', stage2: '' });

  // 데이터 로드
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

  const fetchHospitals = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        stage1: region.stage1,
        stage2: region.stage2,
        numOfRows: '50',
      });

      const response = await fetch(`/api/beds?${params}`);

      if (!response.ok) {
        throw new Error('데이터를 불러오는데 실패했습니다.');
      }

      const data = await response.json();
      const items = Array.isArray(data.items.item)
        ? data.items.item
        : [data.items.item];

      const parsed = items.map((item: Hospital) => parseBedInfo(item));
      setHospitals(parsed);
      setFilteredHospitals(parsed);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  // 통계 계산
  const stats = {
    totalHospitals: filteredHospitals.length,
    totalBeds: filteredHospitals.reduce(
      (sum, h) =>
        sum + Number(h.응급실_일반) + Number(h.응급실_소아) + Number(h.응급실_야간),
      0
    ),
    availableHospitals: filteredHospitals.filter(
      (h) =>
        Number(h.응급실_일반) + Number(h.응급실_소아) + Number(h.응급실_야간) > 0
    ).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-10 md:pb-12 bg-gradient-to-br from-[#287dff] to-[#417dff]">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">
              실시간 응급실 병상 현황
            </h1>
            <p className="text-sm md:text-lg lg:text-xl opacity-90 mb-6 md:mb-8 px-2">
              전국 응급의료기관의 실시간 병상 정보를 한눈에 확인하세요
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4"
              >
                <Activity className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold">{stats.totalHospitals}</p>
                <p className="text-xs md:text-sm opacity-90">등록 병원</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4"
              >
                <TrendingUp className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold">{stats.totalBeds}</p>
                <p className="text-xs md:text-sm opacity-90">가용 병상</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg md:rounded-xl p-3 md:p-4"
              >
                <MapPin className="w-5 h-5 md:w-8 md:h-8 mx-auto mb-1 md:mb-2" />
                <p className="text-xl md:text-3xl font-bold">{stats.availableHospitals}</p>
                <p className="text-xs md:text-sm opacity-90">병상 보유</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <SearchBar
          onSearch={setSearchQuery}
          onRegionChange={(stage1, stage2) => setRegion({ stage1, stage2 })}
        />

        {/* Map */}
        <div className="mb-8">
          <HospitalMap hospitals={filteredHospitals} />
        </div>

        {/* Hospital List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#242424] mb-4">
            응급의료기관 목록
          </h2>
          {region.stage1 && (
            <p className="text-gray-600 mb-4">
              {region.stage1} {region.stage2} 지역 검색 결과
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[#287dff] animate-spin mx-auto mb-4" />
              <p className="text-gray-600">데이터를 불러오는 중...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold mb-1">오류가 발생했습니다</h3>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Hospital Cards */}
        {!loading && !error && (
          <>
            {filteredHospitals.length === 0 ? (
              <div className="text-center py-20">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  검색 결과가 없습니다. 다른 조건으로 검색해보세요.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHospitals.map((hospital, index) => (
                  <HospitalCard
                    key={hospital.기관ID}
                    hospital={hospital}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              데이터 제공: 국립중앙의료원 (공공데이터포털)
            </p>
            <p className="text-sm text-gray-500">
              실시간 응급실 병상 현황 서비스 | Made with Next.js
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
