'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Settings as SettingsIcon, Bell, Lock, Eye, Globe, Moon, ChevronLeft, Save } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('ko');

  const handleSave = () => {
    alert('설정이 저장되었습니다.');
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <SettingsIcon className="w-8 h-8" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">설정</h1>
            <p className="text-lg text-white/90">애플리케이션 설정을 관리하세요</p>
          </motion.div>
        </div>
      </section>

      {/* Settings Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-6">
          {/* Notifications Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#287dff]" />
              알림 설정
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-900">푸시 알림</Label>
                  <p className="text-sm text-gray-500">실시간 병상 정보 알림</p>
                </div>
                <button
                  onClick={() => setNotifications(!notifications)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notifications ? 'bg-[#287dff]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notifications ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-900">이메일 알림</Label>
                  <p className="text-sm text-gray-500">중요한 업데이트 이메일 수신</p>
                </div>
                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    emailNotif ? 'bg-[#287dff]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      emailNotif ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Appearance Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#287dff]" />
              화면 설정
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <Label className="text-sm font-medium text-gray-900">다크 모드</Label>
                  <p className="text-sm text-gray-500">어두운 테마 사용 (준비중)</p>
                </div>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  disabled
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors opacity-50 cursor-not-allowed ${
                    darkMode ? 'bg-[#287dff]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      darkMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <Label className="text-sm font-medium text-gray-900 mb-2 block">언어</Label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#287dff] focus:border-transparent outline-none"
                >
                  <option value="ko">한국어</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Privacy Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-[#242424] mb-4 flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#287dff]" />
              개인정보 및 보안
            </h2>
            <div className="space-y-3">
              <button className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <p className="text-sm font-medium text-gray-900">비밀번호 변경</p>
                <p className="text-xs text-gray-500">계정 비밀번호 변경</p>
              </button>
              <button className="w-full p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left">
                <p className="text-sm font-medium text-gray-900">개인정보 처리방침</p>
                <p className="text-xs text-gray-500">서비스 이용약관 확인</p>
              </button>
              <button className="w-full p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors text-left">
                <p className="text-sm font-medium text-red-600">회원 탈퇴</p>
                <p className="text-xs text-red-500">계정 및 모든 데이터 삭제</p>
              </button>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-4"
          >
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="flex-1 flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              뒤로가기
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[#287dff] hover:bg-[#417dff] flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              저장하기
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
