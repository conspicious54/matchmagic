import { Camera } from 'lucide-react';

interface TakePhotoButtonProps {
  photoCount: number;
  onClick?: () => void;
}

export function TakePhotoButton({ photoCount, onClick }: TakePhotoButtonProps) {
  return (
    <div className="flex-shrink-0 p-6 pt-0">
      <button 
        onClick={onClick}
        className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2 text-white"
      >
        <Camera className="w-5 h-5" />
        <span>Take {photoCount} Photo{photoCount !== 1 ? 's' : ''} ({photoCount} credit{photoCount !== 1 ? 's' : ''})</span>
      </button>
    </div>
  );
}