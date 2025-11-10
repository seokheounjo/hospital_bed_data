'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Heart, ChevronLeft, Settings } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const router = useRouter();

  // TODO: 실제 사용자 데이터로 대체
  const userData = {
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    address: '서울특별시 강남구',
    joinDate: '2025.01.10',
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-4">
              <User className="w-10 h-10" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{userData.name}</h1>
            <p className="text-white/80">{userData.email}</p>
          </motion.div>
        </div>
      </section>

      {/* Profile Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-[#287dff]" />
              개인 정보
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">이메일</p>
                  <p className="text-sm font-medium">{userData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">전화번호</p>
                  <p className="text-sm font-medium">{userData.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">주소</p>
                  <p className="text-sm font-medium">{userData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">가입일</p>
                  <p className="text-sm font-medium">{userData.joinDate}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Activity Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#287dff]" />
              활동 통계
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-[#287dff] mb-1">12</div>
                <div className="text-sm text-gray-600">검색 횟수</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-500 mb-1">5</div>
                <div className="text-sm text-gray-600">즐겨찾기</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-500 mb-1">3</div>
                <div className="text-sm text-gray-600">리뷰 작성</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-500 mb-1">7</div>
                <div className="text-sm text-gray-600">방문 기록</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Button
            onClick={() => router.push('/settings')}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            설정
          </Button>
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            뒤로가기
          </Button>
          <Button
            onClick={() => alert('로그아웃 기능은 현재 개발 중입니다.')}
            variant="outline"
            className="flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50"
          >
            로그아웃
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
