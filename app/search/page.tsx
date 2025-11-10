'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Search, Filter, MapPin, ChevronLeft } from 'lucide-react';
import Header from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function SearchPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const regions = ['서울특별시', '경기도', '인천광역시', '부산광역시', '대구광역시'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 검색 로직 구현
    router.push(`/?search=${searchQuery}&region=${selectedRegion}&district=${selectedDistrict}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#287dff] to-[#417dff] text-white pt-20 md:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">병원 검색</h1>
            <p className="text-lg text-white/90">
              원하는 조건으로 병원을 검색해보세요
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <form onSubmit={handleSearch} className="space-y-6">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">병원명</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="병원명을 입력하세요"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Region Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">지역 선택</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="">전체 지역</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* District Select */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">상세 지역</label>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  disabled={!selectedRegion}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">전체 구/시</option>
                </select>
              </div>
            </div>

            {/* Search Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                뒤로가기
              </Button>
              <Button type="submit" className="flex-1 bg-[#287dff] hover:bg-[#417dff]">
                <Search className="w-4 h-4 mr-2" />
                검색하기
              </Button>
            </div>
          </form>

          {/* Search Tips */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="text-sm font-semibold text-[#287dff] mb-2">💡 검색 팁</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 병원명의 일부만 입력해도 검색이 가능합니다</li>
              <li>• 지역을 선택하면 더 정확한 검색 결과를 얻을 수 있습니다</li>
              <li>• 검색 결과는 실시간 병상 정보를 기준으로 정렬됩니다</li>
            </ul>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
