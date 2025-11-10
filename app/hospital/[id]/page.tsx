'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import {
  ChevronLeft,
  MapPin,
  Phone,
  Clock,
  Bed,
  Activity,
  Stethoscope,
  Ambulance,
  Heart,
  Navigation,
} from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { HospitalParsed } from '@/types/hospital';
import { parseBedInfo } from '@/lib/api';

export default function HospitalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const [hospital, setHospital] = useState<HospitalParsed | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHospitalDetail();
  }, [resolvedParams.id]);

  const fetchHospitalDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/beds?numOfRows=100`);
      if (!response.ok) throw new Error('Failed to fetch');

      const data = await response.json();
      const items = Array.isArray(data.items.item) ? data.items.item : [data.items.item];
      const parsed = items.map(parseBedInfo);

      // Find hospital by ID
      const found = parsed.find((h: HospitalParsed) => h.기관ID === resolvedParams.id);
      setHospital(found || null);
    } catch (err) {
      console.error('Failed to load hospital:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-12 h-12 text-[#287dff] animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">병원 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">병원을 찾을 수 없습니다</h1>
          <Button onClick={() => router.push('/')}>메인으로 돌아가기</Button>
        </div>
      </div>
    );
  }

  const totalBeds = hospital.응급실_일반 + hospital.응급실_소아 + hospital.응급실_야간;
  const bedStatus =
    totalBeds === 0 ? '포화' : totalBeds <= 3 ? '부족' : '여유';
  const statusColor =
    totalBeds === 0
      ? 'text-red-500 bg-red-50'
      : totalBeds <= 3
      ? 'text-orange-500 bg-orange-50'
      : 'text-green-500 bg-green-50';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#287dff] to-[#417dff] text-white pt-20 md:pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>뒤로가기</span>
            </button>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{hospital.병원명}</h1>
            <div className="flex items-center gap-4 text-white/90">
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${statusColor}`}>
                {bedStatus}
              </span>
              <span className="text-sm">기관ID: {hospital.기관ID}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5 text-[#287dff]" />
              연락 정보
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">전화번호</p>
                  <p className="text-sm font-medium">{hospital.전화번호}</p>
                </div>
              </div>
              <Button className="w-full bg-[#287dff] hover:bg-[#417dff]">
                <Phone className="w-4 h-4 mr-2" />
                전화 걸기
              </Button>
            </div>
          </motion.div>

          {/* Bed Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Bed className="w-5 h-5 text-[#287dff]" />
              응급실 병상 현황
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-[#287dff] mb-1">
                  {hospital.응급실_일반}
                </div>
                <div className="text-sm text-gray-600">일반</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-500 mb-1">
                  {hospital.응급실_소아}
                </div>
                <div className="text-sm text-gray-600">소아</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-500 mb-1">
                  {hospital.응급실_야간}
                </div>
                <div className="text-sm text-gray-600">야간</div>
              </div>
            </div>
          </motion.div>

          {/* ICU Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#287dff]" />
              중환자실 현황
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">신경중환자실</span>
                <span className="text-lg font-bold text-[#287dff]">
                  {hospital.중환자실_신경}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">일반중환자실</span>
                <span className="text-lg font-bold text-[#287dff]">
                  {hospital.중환자실_일반}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Equipment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-[#287dff]" />
              의료 장비
            </h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-1">CT</span>
                <span
                  className={`text-sm font-bold ${
                    hospital.CT_가능 === 'Y' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {hospital.CT_가능 === 'Y' ? '가능' : '불가'}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-1">MRI</span>
                <span
                  className={`text-sm font-bold ${
                    hospital.MRI_가능 === 'Y' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {hospital.MRI_가능 === 'Y' ? '가능' : '불가'}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-1">인공호흡기</span>
                <span
                  className={`text-sm font-bold ${
                    hospital.인공호흡기_가능 === 'Y' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {hospital.인공호흡기_가능 === 'Y' ? '가능' : '불가'}
                </span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600 block mb-1">구급차</span>
                <span
                  className={`text-sm font-bold ${
                    hospital.구급차_가용 === 'Y' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {hospital.구급차_가용 === 'Y' ? '가용' : '불가'}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
