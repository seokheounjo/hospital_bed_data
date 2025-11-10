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
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white mb-1">
              {hospital.병원명}
            </h3>
            <div className="flex items-center gap-2 text-white text-sm opacity-90">
              <Phone className="w-4 h-4" />
              <span>{hospital.전화번호}</span>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full ${bedStatusColor} font-bold text-sm`}
          >
            {totalBeds > 0 ? `${totalBeds}개` : '포화'}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-4">
        {/* 응급실 병상 */}
        <div className="bg-[#eff6ff] rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Bed className="w-5 h-5 text-[#287dff]" />
            <h4 className="font-semibold text-[#242424]">응급실 가용 병상</h4>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="text-center">
              <p className="text-gray-500">일반</p>
              <p className="font-bold text-[#287dff]">
                {hospital.응급실_일반}개
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">소아</p>
              <p className="font-bold text-[#287dff]">
                {hospital.응급실_소아}개
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">야간</p>
              <p className="font-bold text-[#287dff]">
                {hospital.응급실_야간}개
              </p>
            </div>
          </div>
        </div>

        {/* 중환자실 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <p className="text-xs text-gray-600 font-medium">중환자실</p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">신경</span>
                <span className="font-semibold">{hospital.신경중환자실}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">일반</span>
                <span className="font-semibold">{hospital.일반중환자실}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Stethoscope className="w-4 h-4 text-gray-600" />
              <p className="text-xs text-gray-600 font-medium">의료 장비</p>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">CT/MRI</span>
                <span className="font-semibold">
                  {hospital.CT가용}/{hospital.MRI가용}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">인공호흡기</span>
                <span className="font-semibold">{hospital.인공호흡기}대</span>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Ambulance className="w-4 h-4" />
            <span>구급차 {hospital.구급차가용}대</span>
          </div>
          <button className="px-4 py-2 bg-white border border-[#287dff] text-[#287dff] rounded-lg hover:bg-[#eff6ff] transition-colors text-sm font-medium">
            상세보기
          </button>
        </div>
      </div>
    </motion.div>
  );
}
