'use client';

import { useState } from 'react';
import { Search, MapPin, Filter, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onRegionChange: (stage1: string, stage2: string) => void;
}

const regions: Record<string, string[]> = {
  서울특별시: ['강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구'],
  경기도: ['수원시', '성남시', '고양시', '용인시', '부천시', '안산시', '안양시', '남양주시', '화성시', '평택시', '의정부시', '시흥시', '파주시', '김포시', '광명시', '광주시', '군포시', '하남시', '오산시', '양주시', '이천시', '구리시', '안성시', '포천시', '의왕시', '양평군', '여주시', '동두천시', '가평군', '과천시', '연천군'],
  인천광역시: ['중구', '동구', '미추홀구', '연수구', '남동구', '부평구', '계양구', '서구', '강화군', '옹진군'],
  부산광역시: ['중구', '서구', '동구', '영도구', '부산진구', '동래구', '남구', '북구', '해운대구', '사하구', '금정구', '강서구', '연제구', '수영구', '사상구', '기장군'],
  대구광역시: ['중구', '동구', '서구', '남구', '북구', '수성구', '달서구', '달성군'],
  광주광역시: ['동구', '서구', '남구', '북구', '광산구'],
  대전광역시: ['동구', '중구', '서구', '유성구', '대덕구'],
  울산광역시: ['중구', '남구', '동구', '북구', '울주군'],
  세종특별자치시: [],
  강원특별자치도: ['춘천시', '원주시', '강릉시', '동해시', '태백시', '속초시', '삼척시'],
  충청북도: ['청주시', '충주시', '제천시'],
  충청남도: ['천안시', '공주시', '보령시', '아산시', '서산시', '논산시', '계룡시', '당진시'],
  전북특별자치도: ['전주시', '군산시', '익산시', '정읍시', '남원시', '김제시'],
  전라남도: ['목포시', '여수시', '순천시', '나주시', '광양시'],
  경상북도: ['포항시', '경주시', '김천시', '안동시', '구미시', '영주시', '영천시', '상주시', '문경시', '경산시'],
  경상남도: ['창원시', '진주시', '통영시', '사천시', '김해시', '밀양시', '거제시', '양산시'],
  제주특별자치도: ['제주시', '서귀포시'],
};

export default function SearchBar({ onSearch, onRegionChange }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage1, setSelectedStage1] = useState('');
  const [selectedStage2, setSelectedStage2] = useState('');

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

  const handleReset = () => {
    setSearchQuery('');
    setSelectedStage1('');
    setSelectedStage2('');
    onSearch('');
    onRegionChange('', '');
  };

  const hasActiveFilters = selectedStage1 || selectedStage2 || searchQuery;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 border border-gray-100">
      {/* Search Input */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="병원명으로 검색..."
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none transition-all"
          />
        </div>
      </form>

      {/* Region Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Stage 1 (시/도) */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={selectedStage1}
            onChange={(e) => handleStage1Change(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer"
          >
            <option value="">전체 지역</option>
            {Object.keys(regions).map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Stage 2 (시/군/구) */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <select
            value={selectedStage2}
            onChange={(e) => handleStage2Change(e.target.value)}
            disabled={!selectedStage1 || regions[selectedStage1]?.length === 0}
            className="w-full pl-10 pr-4 py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none transition-all appearance-none bg-white cursor-pointer disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">전체 구/시</option>
            {selectedStage1 &&
              regions[selectedStage1]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">선택된 필터:</span>
          {selectedStage1 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#287dff] rounded-full text-sm font-medium">
              {selectedStage1}
            </span>
          )}
          {selectedStage2 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#287dff] rounded-full text-sm font-medium">
              {selectedStage2}
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-[#287dff] rounded-full text-sm font-medium">
              "{searchQuery}"
            </span>
          )}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium ml-auto"
          >
            <X className="w-4 h-4" />
            초기화
          </button>
        </div>
      )}
    </div>
  );
}
