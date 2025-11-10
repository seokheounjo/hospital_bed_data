'use client';

import { motion, AnimatePresence } from 'motion/react';
import { X, Construction } from 'lucide-react';

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  feature,
}: ComingSoonModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-[#eff6ff] rounded-full flex items-center justify-center">
                  <Construction className="w-10 h-10 text-[#287dff]" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-[#242424] mb-3">
                  준비중입니다
                </h3>
                <p className="text-gray-600 mb-2">
                  <span className="font-semibold text-[#287dff]">
                    {feature}
                  </span>{' '}
                  기능은 현재 개발 중입니다.
                </p>
                <p className="text-gray-500 text-sm mb-6">
                  더 나은 서비스로 곧 찾아뵙겠습니다.
                </p>

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-[#417dff] text-white rounded-lg hover:bg-[#287dff] transition-colors font-medium"
                >
                  확인
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
