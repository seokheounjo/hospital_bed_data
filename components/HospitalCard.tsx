'use client';

import { motion } from 'framer-motion';
import {
  Phone,
  MapPin,
  Ambulance,
  Activity,
  Heart,
  Bed,
  Stethoscope,
} from 'lucide-react';
import { HospitalParsed } from '@/types/hospital';

interface HospitalCardProps {
  hospital: HospitalParsed;
  index: number;
}

export default function HospitalCard({ hospital, index }: HospitalCardProps) {
  const totalBeds =
    Number(hospital.응급실_일반) +
    Number(hospital.응급실_소아) +
    Number(hospital.응급실_야간);

  const getBedStatusColor = (beds: number) => {
    if (beds === 0) return 'text-red-500 bg-red-50';
    if (beds <= 3) return 'text-orange-500 bg-orange-50';
    return 'text-green-500 bg-green-50';
  };

  const bedStatusColor = getBedStatusColor(totalBeds);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#287dff] to-[#417dff] p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white mb-1 break-words leading-tight">
              {hospital.병원명}
            </h3>
            <div className="flex items-center gap-2 text-white text-xs md:text-sm opacity-90">
              <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
              <span className="truncate">{hospital.전화번호}</span>
            </div>
          </div>
          <div
            className={`px-2 md:px-3 py-1 rounded-full ${bedStatusColor} font-bold text-xs md:text-sm flex-shrink-0 whitespace-nowrap`}
          >
            {totalBeds > 0 ? `${totalBeds}개` : '포화'}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-3 md:p-4 space-y-3 md:space-y-4">
        {/* 응급실 병상 */}
        <div className="bg-[#eff6ff] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-3">
            <Bed className="w-4 h-4 md:w-5 md:h-5 text-[#287dff]" />
            <h4 className="font-semibold text-sm md:text-base text-[#242424]">응급실 가용 병상</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs md:text-sm">
            <div className="text-center">
              <p className="text-gray-500 mb-1">일반</p>
              <p className="font-bold text-[#287dff] text-sm md:text-base">
                {hospital.응급실_일반}개
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-1">소아</p>
              <p className="font-bold text-[#287dff] text-sm md:text-base">
                {hospital.응급실_소아}개
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 mb-1">야간</p>
              <p className="font-bold text-[#287dff] text-sm md:text-base">
                {hospital.응급실_야간}개
              </p>
            </div>
          </div>
        </div>

        {/* 중환자실 & 의료장비 */}
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <div className="flex items-center gap-1 md:gap-2 mb-2">
              <Activity className="w-3 h-3 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
              <p className="text-[10px] md:text-xs text-gray-600 font-medium">중환자실</p>
            </div>
            <div className="space-y-1 text-[10px] md:text-xs">
              <div className="flex justify-between gap-1">
                <span className="text-gray-500">신경</span>
                <span className="font-semibold truncate">{hospital.신경중환자실}</span>
              </div>
              <div className="flex justify-between gap-1">
                <span className="text-gray-500">일반</span>
                <span className="font-semibold truncate">{hospital.일반중환자실}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <div className="flex items-center gap-1 md:gap-2 mb-2">
              <Stethoscope className="w-3 h-3 md:w-4 md:h-4 text-gray-600 flex-shrink-0" />
              <p className="text-[10px] md:text-xs text-gray-600 font-medium">의료장비</p>
            </div>
            <div className="space-y-1 text-[10px] md:text-xs">
              <div className="flex justify-between gap-1">
                <span className="text-gray-500">CT/MRI</span>
                <span className="font-semibold">
                  {hospital.CT가용}/{hospital.MRI가용}
                </span>
              </div>
              <div className="flex justify-between gap-1">
                <span className="text-gray-500 truncate">인공호흡기</span>
                <span className="font-semibold flex-shrink-0">{hospital.인공호흡기}대</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <Ambulance className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
            <span>구급차 {hospital.구급차가용}대</span>
          </div>
          <button className="w-full sm:w-auto px-3 md:px-4 py-1.5 md:py-2 bg-white border border-[#287dff] text-[#287dff] rounded-lg hover:bg-[#eff6ff] transition-colors text-xs md:text-sm font-medium">
            상세보기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
