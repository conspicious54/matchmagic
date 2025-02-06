import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { supabase } from '../../lib/supabase';
import { PhotoControls } from '../features/sidebar/PhotoControls';
import { PromptInput } from '../features/sidebar/PromptInput';
import { StyleSelector } from '../features/sidebar/StyleSelector';
import { AccuracySlider } from '../features/sidebar/AccuracySlider';
import { ModelStatus } from '../features/sidebar/ModelStatus';
import { TakePhotoButton } from '../features/sidebar/TakePhotoButton';

// Custom event for prompt updates
export const promptUpdateEvent = new Event('promptUpdate');

// Global prompt state
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
  progress: number | null;
  message: string | null;
}

const STYLE_OPTIONS = [
  "Cinematic", "Portrait", "Film Noir", "Vintage", "Modern",
  "Natural Light", "Studio Light", "Golden Hour", "Blue Hour",
  "High Fashion", "Street Photography", "Documentary",
  "Minimalist", "Dramatic", "Ethereal"
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

export function ModelSidebar() {
  const { user } = useAuth();
  const [modelStatus, setModelStatus] = useState<ModelStatus>({
    isLoading: true,
    name: null,
    error: null,
    progress: null,
    message: null
  });
  const [prompt, setPrompt] = useState('');
  const [accuracy, setAccuracy] = useState(80);
  const [style, setStyle] = useState('');
  const [cameraAngle, setCameraAngle] = useState('');
  const [photoCount, setPhotoCount] = useState(5);
  const [cameraType, setCameraType] = useState('');

  useEffect(() => {
    const handlePromptUpdate = (event: CustomEvent) => {
      const data = event.detail;
      setPrompt(data.prompt);
      setStyle(data.style);
      setCameraAngle(data.cameraAngle);
      setPhotoCount(data.photoCount);
      setCameraType(data.cameraType);
    };

    window.addEventListener('promptUpdate', handlePromptUpdate as EventListener);
    return () => window.removeEventListener('promptUpdate', handlePromptUpdate as EventListener);
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchProgress = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('status, output')
        .eq('user_id', user.id)
        .eq('type', 'model_training')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching job progress:', error);
        return;
      }

      if (data) {
        setModelStatus(prev => ({
          ...prev,
          progress: data.output?.progress || null,
          message: data.output?.message || null,
          isLoading: data.status === 'processing'
        }));
      }
    };

    fetchProgress();

    const subscription = supabase
      .channel('jobs_progress')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'jobs',
          filter: `user_id=eq.${user.id} AND type=eq.model_training`
        },
        (payload) => {
          setModelStatus(prev => ({
            ...prev,
            progress: payload.new.output?.progress || null,
            message: payload.new.output?.message || null,
            isLoading: payload.new.status === 'processing'
          }));
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handlePhotoCountChange = (newCount: number) => {
    setPhotoCount(newCount);
    setGlobalPrompt(prompt, style, cameraAngle, newCount, cameraType);
  };

  const handlePromptChange = (newPrompt: string) => {
    setPrompt(newPrompt);
    setGlobalPrompt(newPrompt, style, cameraAngle, photoCount, cameraType);
  };

  const handleStyleChange = (newStyle: string) => {
    setStyle(newStyle);
    setGlobalPrompt(prompt, newStyle, cameraAngle, photoCount, cameraType);
  };

  const handleCameraAngleChange = (newAngle: string) => {
    setCameraAngle(newAngle);
    setGlobalPrompt(prompt, style, newAngle, photoCount, cameraType);
  };

  const handleCameraTypeChange = (newType: string) => {
    setCameraType(newType);
    setGlobalPrompt(prompt, style, cameraAngle, photoCount, newType);
  };

  const handleAccuracyChange = (newAccuracy: number) => {
    setAccuracy(newAccuracy);
  };

  return (
    <aside className="w-80 bg-gray-900/50 border-r border-gray-800/50 backdrop-blur-xl fixed left-0 top-16 bottom-0 flex flex-col">
      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">
          <ModelStatus
            isLoading={modelStatus.isLoading}
            name={modelStatus.name}
            progress={modelStatus.progress}
            message={modelStatus.message}
          />

          {/* Controls Section */}
          <div className="space-y-8">
            <PromptInput 
              value={prompt}
              onChange={handlePromptChange}
              tooltip="Describe what you want to create. Be specific about the setting, lighting, and mood you want to achieve."
            />

            <AccuracySlider
              value={accuracy}
              onChange={handleAccuracyChange}
              tooltip="Adjust how closely the AI should follow your reference photos. 'Creative' allows more artistic freedom, while 'Accurate' stays closer to your original look."
            />

            <StyleSelector
              value={style}
              onChange={handleStyleChange}
              options={STYLE_OPTIONS}
              label="Style/Film Type"
              tooltip="Choose a visual style or film simulation that sets the overall mood and look of your photo."
            />

            <StyleSelector
              value={cameraAngle}
              onChange={handleCameraAngleChange}
              options={CAMERA_ANGLE_OPTIONS}
              label="Camera Angle"
              tooltip="Pick the angle from which the photo will be taken. Different angles can dramatically change how you look."
            />

            <StyleSelector
              value={cameraType}
              onChange={handleCameraTypeChange}
              options={CAMERA_TYPE_OPTIONS}
              label="Camera Type"
              tooltip="Select the camera model to simulate different image characteristics and qualities."
            />
          </div>
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <PhotoControls
        photoCount={photoCount}
        onPhotoCountChange={handlePhotoCountChange}
      />

      <TakePhotoButton photoCount={photoCount} />
    </aside>
  );
}