import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, Camera, Info, Minus, Plus, ChevronLeft } from 'lucide-react';
import { useAuth } from '../components/auth/AuthContext';
import { setGlobalPrompt } from '../components/portal/ModelSidebar';

const STYLE_OPTIONS = [
  "Cinematic", "Portrait", "Film Noir", "Vintage", "Modern",
  "Natural Light", "Studio Light", "Golden Hour", "Blue Hour",
  "High Fashion", "Street Photography", "Documentary",
  "Minimalist", "Dramatic", "Ethereal"
];

const EMOTION_OPTIONS = [
  "Happy", "Confident", "Professional", "Friendly", "Serious",
  "Thoughtful", "Relaxed", "Energetic", "Determined", "Approachable",
  "Focused", "Peaceful", "Enthusiastic", "Calm", "Inspired"
];

const CAMERA_ANGLE_OPTIONS = [
  "Front Face", "Three-Quarter", "Profile", "High Angle",
  "Low Angle", "Dutch Angle", "Close-Up", "Medium Shot",
  "Full Body", "Over the Shoulder"
];

const CAMERA_TYPE_OPTIONS = [
  "Canon EOS R5", "Sony A7III", "Nikon Z6", "Fujifilm X-T4",
  "Leica Q2", "Phase One IQ4", "Hasselblad X2D", "Sony A1",
  "Canon EOS R6", "Leica M11"
];

export default function CreatePage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [accuracy, setAccuracy] = useState(80);
  const [style, setStyle] = useState('');
  const [emotion, setEmotion] = useState('');
  const [cameraAngle, setCameraAngle] = useState('');
  const [photoCount, setPhotoCount] = useState(5);
  const [cameraType, setCameraType] = useState('');

  useEffect(() => {
    document.title = 'Create Photo | PhotoMatchAI';
  }, []);

  const tooltips = {
    prompt: "Describe what you want to create. Be specific about the setting, lighting, and mood you want to achieve.",
    accuracy: "Adjust how closely the AI should follow your reference photos.",
    style: "Choose a visual style or film simulation for your photo.",
    emotion: "Select the emotional expression or feeling to convey.",
    cameraAngle: "Pick the angle for the photo.",
    cameraType: "Select the camera model to simulate.",
    photoCount: "Choose how many photos to generate (1-5)."
  };

  const updateGlobalPrompt = () => {
    setGlobalPrompt(prompt, style, cameraAngle, photoCount, cameraType);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-gray-900/50 border-b border-gray-800/50 backdrop-blur-xl z-40">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 pt-24 pb-32">
        {/* Model Status */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-lg p-4 border border-gray-700/50 mb-8">
          <div className="flex items-start space-x-2 text-xs text-gray-400">
            <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <p>Your model is ready! Use the controls below to create your perfect photo.</p>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-6">
          {/* Prompt */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">Prompt</label>
              <HelpCircle className="w-4 h-4 text-gray-400" />
            </div>
            <textarea
              value={prompt}
              onChange={(e) => {
                setPrompt(e.target.value);
                updateGlobalPrompt();
              }}
              className="w-full h-24 px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white placeholder-gray-500"
              placeholder="Describe your photo..."
            />
          </div>

          {/* Accuracy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-200">Accuracy</label>
              <span className="text-sm text-gray-400">{accuracy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={accuracy}
              onChange={(e) => setAccuracy(parseInt(e.target.value))}
              className="w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Creative</span>
              <span>Accurate</span>
            </div>
          </div>

          {/* Style */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Style</label>
            <select
              value={style}
              onChange={(e) => {
                setStyle(e.target.value);
                updateGlobalPrompt();
              }}
              className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
            >
              <option value="">Select style</option>
              {STYLE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Emotion */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Emotion</label>
            <select
              value={emotion}
              onChange={(e) => setEmotion(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
            >
              <option value="">Select emotion</option>
              {EMOTION_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Camera Angle */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Camera Angle</label>
            <select
              value={cameraAngle}
              onChange={(e) => {
                setCameraAngle(e.target.value);
                updateGlobalPrompt();
              }}
              className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
            >
              <option value="">Select angle</option>
              {CAMERA_ANGLE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* Camera Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200">Camera Type</label>
            <select
              value={cameraType}
              onChange={(e) => {
                setCameraType(e.target.value);
                updateGlobalPrompt();
              }}
              className="w-full px-3 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all text-white"
            >
              <option value="">Select camera</option>
              {CAMERA_TYPE_OPTIONS.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 border-t border-gray-800 p-4 space-y-4">
        {/* Photo Count */}
        <div className="flex items-center justify-between px-4">
          <button
            onClick={() => {
              const newCount = Math.max(1, photoCount - 1);
              setPhotoCount(newCount);
              updateGlobalPrompt();
            }}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400"
            disabled={photoCount <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          
          <span className="text-lg font-medium text-white">
            {photoCount} Photo{photoCount !== 1 ? 's' : ''}
          </span>
          
          <button
            onClick={() => {
              const newCount = Math.min(5, photoCount + 1);
              setPhotoCount(newCount);
              updateGlobalPrompt();
            }}
            className="p-2 rounded-lg bg-gray-800/50 text-gray-400"
            disabled={photoCount >= 5}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Take Photo Button */}
        <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 transition-all duration-300 flex items-center justify-center space-x-2 text-white">
          <Camera className="w-5 h-5" />
          <span>Take {photoCount} Photo{photoCount !== 1 ? 's' : ''} ({photoCount} credit{photoCount !== 1 ? 's' : ''})</span>
        </button>
      </div>
    </div>
  );
}