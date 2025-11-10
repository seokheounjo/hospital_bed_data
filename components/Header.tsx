import { useState } from 'react';
import { Heart, Menu, X, Activity, Search, User, Settings } from 'lucide-react';
import { ComingSoonModal } from '@/components/ComingSoonModal';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonFeature, setComingSoonFeature] = useState('');

  const handleFeatureClick = (feature: string) => {
    setComingSoonFeature(feature);
    setShowComingSoon(true);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: '실시간 병상', icon: Activity, href: '#', active: true },
    { name: '병원 검색', icon: Search, href: '#', comingSoon: true },
    { name: '내 정보', icon: User, href: '#', comingSoon: true },
    { name: '설정', icon: Settings, href: '#', comingSoon: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#287dff] fill-[#287dff]" />
              <span className="text-lg md:text-xl text-[#242424]">
                <span className="hidden sm:inline">응급실 </span>병상찾기
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => item.comingSoon && handleFeatureClick(item.name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-blue-50 text-[#287dff]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>

            {/* Login Button (Desktop) */}
            <button
              onClick={() => handleFeatureClick('로그인')}
              className="hidden lg:block px-4 py-2 bg-[#287dff] text-white rounded-lg hover:bg-[#417dff] transition-colors"
            >
              로그인
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => item.comingSoon && handleFeatureClick(item.name)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-blue-50 text-[#287dff]'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </button>
                ))}
                <button
                  onClick={() => handleFeatureClick('로그인')}
                  className="mt-2 px-4 py-3 bg-[#287dff] text-white rounded-lg hover:bg-[#417dff] transition-colors"
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
