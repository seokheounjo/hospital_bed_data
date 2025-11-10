import { motion } from 'motion/react';
import { Phone, Bed, Activity, Stethoscope, Ambulance, ChevronRight } from 'lucide-react';
import { HospitalParsed } from '@/types/hospital';
import { useState } from 'react';
import { ComingSoonModal } from '@/components/ComingSoonModal';

interface HospitalCardProps {
  hospital: HospitalParsed;
  index: number;
}

export function HospitalCard({ hospital, index }: HospitalCardProps) {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const totalBeds =
    Number(hospital.응급실_일반) +
    Number(hospital.응급실_소아) +
    Number(hospital.응급실_야간);

  const getBedStatus = (beds: number) => {
    if (beds === 0) return { text: '포화', color: 'text-red-500 bg-red-50' };
    if (beds <= 3) return { text: '부족', color: 'text-orange-500 bg-orange-50' };
    return { text: '여유', color: 'text-green-500 bg-green-50' };
  };

  const status = getBedStatus(totalBeds);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#287dff] to-[#417dff] text-white p-3 md:p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="flex-1 min-w-0 break-words">{hospital.병원명}</h3>
            <span className={`flex-shrink-0 px-2 py-1 rounded-full text-xs ${status.color}`}>
              {status.text}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/90">
            <Phone className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{hospital.전화번호}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-3 md:p-4 space-y-3">
          {/* 응급실 병상 */}
          <div className="bg-[#eff6ff] rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Bed className="w-4 h-4 md:w-5 md:h-5 text-[#287dff]" />
              <span className="text-sm md:text-base text-[#242424]">응급실 가용 병상</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <div className="text-xs text-gray-600">일반</div>
                <div className="text-lg md:text-xl text-[#287dff]">{hospital.응급실_일반}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">소아</div>
                <div className="text-lg md:text-xl text-[#287dff]">{hospital.응급실_소아}</div>
              </div>
              <div>
                <div className="text-xs text-gray-600">야간</div>
                <div className="text-lg md:text-xl text-[#287dff]">{hospital.응급실_야간}</div>
              </div>
            </div>
          </div>

          {/* 중환자실 & 장비 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* 중환자실 */}
            <div className="bg-[#f9fafb] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-[#287dff]" />
                <span className="text-sm text-[#242424]">중환자실</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">신경</span>
                  <span className="text-[#287dff]">{hospital.중환자실_신경}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">일반</span>
                  <span className="text-[#287dff]">{hospital.중환자실_일반}</span>
                </div>
              </div>
            </div>

            {/* 의료장비 */}
            <div className="bg-[#f9fafb] rounded-lg p-3">
              <div className="flex items-center gap-2 mb-2">
                <Stethoscope className="w-4 h-4 text-[#287dff]" />
                <span className="text-sm text-[#242424]">의료장비</span>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">CT/MRI</span>
                  <span className={hospital.CT_가능 === 'Y' ? 'text-green-500' : 'text-red-500'}>
                    {hospital.CT_가능 === 'Y' ? '가능' : '불가'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">인공호흡기</span>
                  <span className={hospital.인공호흡기_가능 === 'Y' ? 'text-green-500' : 'text-red-500'}>
                    {hospital.인공호흡기_가능 === 'Y' ? '가능' : '불가'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Ambulance className="w-4 h-4" />
              <span>
                구급차: <span className={hospital.구급차_가용 === 'Y' ? 'text-green-500' : 'text-red-500'}>
                  {hospital.구급차_가용 === 'Y' ? '가용' : '불가'}
                </span>
              </span>
            </div>
            <button
              onClick={() => setShowComingSoon(true)}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#287dff] hover:bg-blue-50 rounded-lg transition-colors"
            >
              상세보기
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature="병원 상세보기"
      />
    </>
  );
}
