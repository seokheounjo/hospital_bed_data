'use client';

import { useState } from 'react';
import { Menu, X, Heart, MapPin, Search, User, Settings } from 'lucide-react';
import ComingSoonModal from './ComingSoonModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#287dff] flex-shrink-0" />
              <h1 className="text-base md:text-xl font-bold text-[#242424] truncate">
                <span className="hidden sm:inline">응급실 병상 찾기</span>
                <span className="sm:hidden">병상찾기</span>
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button className="flex items-center gap-2 text-sm text-[#212121] hover:text-[#287dff] transition-colors">
                <MapPin className="w-4 h-4" />
                <span>실시간 병상</span>
              </button>
              <button
                onClick={() => handleFeatureClick('병원 검색')}
                className="flex items-center gap-2 text-sm text-[#212121] hover:text-[#287dff] transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>병원 검색</span>
              </button>
              <button
                onClick={() => handleFeatureClick('내 정보')}
                className="flex items-center gap-2 text-sm text-[#212121] hover:text-[#287dff] transition-colors"
              >
                <User className="w-4 h-4" />
                <span>내 정보</span>
              </button>
              <button
                onClick={() => handleFeatureClick('설정')}
                className="flex items-center gap-2 text-sm text-[#212121] hover:text-[#287dff] transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>설정</span>
              </button>
            </nav>

            {/* Login Button (Desktop) */}
            <button
              onClick={() => handleFeatureClick('로그인')}
              className="hidden lg:block px-4 md:px-6 py-1.5 md:py-2 bg-[#417dff] text-white rounded-lg hover:bg-[#287dff] transition-colors text-sm font-medium"
            >
              로그인
            </button>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-1.5 md:p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-[#212121]" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-[#212121]" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col gap-4">
                <button className="flex items-center gap-2 text-[#212121] hover:text-[#287dff] transition-colors">
                  <MapPin className="w-4 h-4" />
                  <span>실시간 병상</span>
                </button>
                <button
                  onClick={() => handleFeatureClick('병원 검색')}
                  className="flex items-center gap-2 text-[#212121] hover:text-[#287dff] transition-colors"
                >
                  <Search className="w-4 h-4" />
                  <span>병원 검색</span>
                </button>
                <button
                  onClick={() => handleFeatureClick('내 정보')}
                  className="flex items-center gap-2 text-[#212121] hover:text-[#287dff] transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>내 정보</span>
                </button>
                <button
                  onClick={() => handleFeatureClick('설정')}
                  className="flex items-center gap-2 text-[#212121] hover:text-[#287dff] transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>설정</span>
                </button>
                <button
                  onClick={() => handleFeatureClick('로그인')}
                  className="px-6 py-2 bg-[#417dff] text-white rounded-lg hover:bg-[#287dff] transition-colors"
                >
                  로그인
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        feature={comingSoonFeature}
      />
    </>
  );
}
