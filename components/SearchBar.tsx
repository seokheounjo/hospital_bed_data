'use client';

import { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRegionChange: (stage1: string, stage2: string) => void;
}

export default function SearchBar({ onSearch, onRegionChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage1, setSelectedStage1] = useState('');
  const [selectedStage2, setSelectedStage2] = useState('');

  const regions = {
    서울특별시: ['강남구', '강동구', '강북구', '강서구', '관악구', '종로구', '중구'],
    경기도: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시'],
    인천광역시: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구'],
    부산광역시: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구'],
    대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구'],
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleStage1Change = (value: string) => {
    setSelectedStage1(value);
    setSelectedStage2('');
    onRegionChange(value, '');
  };

  const handleStage2Change = (value: string) => {
    setSelectedStage2(value);
    onRegionChange(selectedStage1, value);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="병원명으로 검색하세요..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287dff] focus:border-transparent text-[#242424]"
          />
        </div>
      </form>

      {/* Region Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 시/도 선택 */}
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedStage1}
            onChange={(e) => handleStage1Change(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287dff] focus:border-transparent appearance-none bg-white text-[#242424]"
          >
            <option value="">전체 지역</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* 시/군/구 선택 */}
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={selectedStage2}
            onChange={(e) => handleStage2Change(e.target.value)}
            disabled={!selectedStage1}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#287dff] focus:border-transparent appearance-none bg-white text-[#242424] disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">전체 구/시</option>
            {selectedStage1 &&
              regions[selectedStage1 as keyof typeof regions]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Selected filters display */}
      {(selectedStage1 || selectedStage2) && (
        <div className="mt-4 flex items-center gap-2">
          <span className="text-sm text-gray-500">필터:</span>
          {selectedStage1 && (
            <span className="px-3 py-1 bg-[#eff6ff] text-[#287dff] rounded-full text-sm font-medium">
              {selectedStage1}
            </span>
          )}
          {selectedStage2 && (
            <span className="px-3 py-1 bg-[#eff6ff] text-[#287dff] rounded-full text-sm font-medium">
              {selectedStage2}
            </span>
          )}
          <button
            onClick={() => {
              setSelectedStage1('');
              setSelectedStage2('');
              onRegionChange('', '');
            }}
            className="ml-auto text-sm text-gray-500 hover:text-[#287dff] transition-colors"
          >
            초기화
          </button>
        </div>
      )}
    </div>
  );
}
