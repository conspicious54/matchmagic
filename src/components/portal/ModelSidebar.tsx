import { useState, useEffect } from 'react';
import { HelpCircle, Camera, Heart, Info, Minus, Plus } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthContext';
import { supabase } from '../../lib/supabase';

// Create a custom event for prompt updates
export const promptUpdateEvent = new Event('promptUpdate');

// Create a global prompt state that can be accessed from other components
let globalPrompt = {
  prompt: '',
  style: '',
  cameraAngle: '',
  photoCount: 5,
  cameraType: ''
};

export const setGlobalPrompt = (
  prompt: string, 
  style: string = '', 
  cameraAngle: string = '', 
  photoCount: number = 5, 
  cameraType: string = ''
) => {
  globalPrompt = {
    prompt,
    style,
    cameraAngle,
    photoCount,
    cameraType
  };
  // Create a new CustomEvent with the data in the detail property
  const event = new CustomEvent('promptUpdate', { 
    detail: globalPrompt
  });
  window.dispatchEvent(event);
};

export const getGlobalPrompt = () => globalPrompt;

interface ModelStatus {
  isLoading: boolean;
  name: string | null;
  error: string | null;
}

const STYLE_OPTIONS = [
  "Cinematic",
  "Portrait",
  "Film Noir",
  "Vintage",
  "Modern",
  "Natural Light",
  "Studio Light",
  "Golden Hour",
  "Blue Hour",
  "High Fashion",
  "Street Photography",
  "Documentary",
  "Minimalist",
  "Dramatic",
  "Ethereal"
];

const EMOTION_OPTIONS = [
  "Happy",
  "Confident",
  "Professional",
  "Friendly",
  "Serious",
  "Thoughtful",
  "Relaxed",
  "Energetic",
  "Determined",
  "Approachable",
  "Focused",
  "Peaceful",
  "Enthusiastic",
  "Calm",
  "Inspired"
];

const CAMERA_ANGLE_OPTIONS = [
  "Front Face",
  "Three-Quarter",
  "Profile",
  "High Angle",
  "Low Angle",
  "Dutch Angle",
  "Close-Up",
  "Medium Shot",
  "Full Body",
  "Over the Shoulder"
];

export function ModelSidebar() {
  const { user } = useAuth();
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    isLoading: true,
    name: null,
    error: null
  });
  const [prompt, setPrompt] = useState('');
  const [accuracy, setAccuracy] = useState(80);
  const [style, setStyle] = useState('');
  const [emotion, setEmotion] = useState('');
  const [cameraAngle, setCameraAngle] = useState('');
  const [photoCount, setPhotoCount] = useState(5);

  // Listen for prompt updates
  useEffect(() => {
    const handlePromptUpdate = (event: CustomEvent) => {
      const data = event.detail;
      setPrompt(data.prompt);
      setStyle(data.style);
      setCameraAngle(data.cameraAngle);
    };

    window.addEventListener('promptUpdate', handlePromptUpdate as EventListener);
    return () => window.removeEventListener('promptUpdate', handlePromptUpdate as EventListener);
  }, []);

  // Tooltip content
  const tooltips = {
    prompt: "Describe what you want to create. Be specific about the setting, lighting, and mood you want to achieve.",
    accuracy: "Adjust how closely the AI should follow your reference photos. 'Creative' allows more artistic freedom, while 'Accurate' stays closer to your original look.",
    style: "Choose a visual style or film simulation that sets the overall mood and look of your photo.",
    emotion: "Select the emotional expression or feeling you want to convey in the photo.",
    cameraAngle: "Pick the angle from which the photo will be taken. Different angles can dramatically change how you look."
  };

  return (
    <aside className="w-80 bg-gray-900/50 border-r border-gray-800/50 backdrop-blur-xl p-6 space-y-8 h-[calc(100vh-4rem)] md:fixed md:left-0 top-16 overflow-hidden flex flex-col">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto space-y-8 pb-32">
        {/* Center content on mobile */}
        <div className="md:text-left text-center">
          {/* Model Status */}
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50">
            {modelStatus.isLoading ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3 justify-center md:justify-start">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-pink-500 border-t-transparent"></div>
                  <span className="text-gray-300">Loading your model...</span>
                </div>
                <div className="flex items-start space-x-2 text-xs text-gray-400 bg-gray-800/50 p-2 rounded">
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>Model training can take 4-5 hours. We'll notify you when it's ready!</p>
                </div>
              </div>
            ) : modelStatus.name ? (
              <div>
                <h3 className="font-semibold text-lg text-white">{modelStatus.name}</h3>
                <p className="text-sm text-gray-300">Your model is ready</p>
              </div>
            ) : (
              <div className="text-gray-300 text-sm">
                Your model is still in the works. This usually takes ~45 minutes, but can take up to 4-5 hours for best results.
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="mt-auto space-y-8">
            {/* Prompt Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Prompt</label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltips.prompt}
                  </div>
                </div>
              </div>
              <textarea
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setGlobalPrompt(e.target.value, style, cameraAngle);
                }}
                className="w-full h-24 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white placeholder-gray-500"
                placeholder="Describe your photo..."
              />
            </div>

            {/* Accuracy Slider */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Accuracy</label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltips.accuracy}
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-lg blur"></div>
                <div className="relative bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Creative</span>
                    <span className="text-sm font-medium text-white">{accuracy}%</span>
                    <span className="text-sm text-gray-400">Accurate</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={accuracy}
                    onChange={(e) => setAccuracy(parseInt(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-pink-500 [&::-webkit-slider-thumb]:shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Style Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Style/Film Type</label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltips.style}
                  </div>
                </div>
              </div>
              <select
                value={style}
                onChange={(e) => {
                  setStyle(e.target.value);
                  setGlobalPrompt(prompt, e.target.value, cameraAngle);
                }}
                className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
              >
                <option value="" className="bg-gray-900 text-gray-300">Select style</option>
                {STYLE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-gray-900 text-white">{option}</option>
                ))}
              </select>
            </div>

            {/* Emotion Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Emotion</label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltips.emotion}
                  </div>
                </div>
              </div>
              <select
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
              >
                <option value="" className="bg-gray-900 text-gray-300">Select emotion</option>
                {EMOTION_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-gray-900 text-white">{option}</option>
                ))}
              </select>
            </div>

            {/* Camera Angle Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-200">Camera Angle</label>
                <div className="group relative">
                  <HelpCircle className="w-4 h-4 text-gray-400 hover:text-white cursor-help" />
                  <div className="absolute bottom-full right-0 mb-2 w-64 p-2 bg-gray-800 rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {tooltips.cameraAngle}
                  </div>
                </div>
              </div>
              <select
                value={cameraAngle}
                onChange={(e) => {
                  setCameraAngle(e.target.value);
                  setGlobalPrompt(prompt, style, e.target.value);
                }}
                className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
              >
                <option value="" className="bg-gray-900 text-gray-300">Select angle</option>
                {CAMERA_ANGLE_OPTIONS.map((option) => (
                  <option key={option} value={option} className="bg-gray-900 text-white">{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent">
        {/* Photo Count Selector */}
        <div className="mb-4 flex items-center justify-center space-x-4">
          <button
            onClick={() => setPhotoCount(Math.max(1, photoCount - 1))}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
            disabled={photoCount <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="text-lg font-medium text-white">{photoCount} Photos</span>
          
          <button
            onClick={() => setPhotoCount(Math.min(5, photoCount + 1))}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400 hover:text-white transition-colors"
            disabled={photoCount >= 5}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Take Photo Button */}
        <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25 flex items-center justify-center space-x-2 text-white">
          <Camera className="w-5 h-5" />
          <span>Take {photoCount} Photo{photoCount > 1 ? 's' : ''} ({photoCount} credit{photoCount > 1 ? 's' : ''})</span>
        </button>
      </div>
    </aside>
  );
}