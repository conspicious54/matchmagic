import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, ChevronRight, ChevronLeft, Loader2, AlertCircle, Camera, Sparkles, User2, Info } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../components/auth/AuthContext';
import { uploadTrainingPhoto, deleteTrainingPhoto } from '../lib/upload';

interface UserProfile {
  name: string;
  gender: 'man' | 'woman' | '';
  age: number;
  eyeColor: string;
  ethnicity: string;
  hairStatus: 'hair' | 'bald' | '';
  consentAgreed: boolean;
}

interface TrainingImage {
  id: string;
  file: File;
  previewUrl: string;
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
  path?: string;
}

const MAX_PHOTOS = 15;
const MINIMUM_PHOTOS = 5;

const ETHNICITIES = [
  "African",
  "African American",
  "Caribbean",
  "East Asian",
  "South Asian",
  "Southeast Asian",
  "Middle Eastern",
  "Hispanic/Latino",
  "Native American",
  "Pacific Islander",
  "White/Caucasian",
  "Mixed/Multiracial"
];

const EYE_COLORS = [
  "Amber",
  "Blue",
  "Brown",
  "Gray",
  "Green",
  "Hazel"
];

export default function CreateModelPage() {
  useEffect(() => {
    document.title = 'Create Model | PhotoMatchAI';
  }, []);

  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    gender: '',
    age: 18,
    eyeColor: '',
    ethnicity: '',
    hairStatus: '',
    consentAgreed: false
  });
  const [images, setImages] = useState<TrainingImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || !user) return;

    // Check if adding these files would exceed the limit
    if (images.length + files.length > MAX_PHOTOS) {
      setError(`You can only upload up to ${MAX_PHOTOS} photos. Please remove some photos first.`);
      return;
    }

    setError(null);

    // Create preview images and add to state with pending status
    const newImages: TrainingImage[] = Array.from(files).map((file) => ({
      id: Date.now() + Math.random().toString(),
      file,
      previewUrl: URL.createObjectURL(file),
      uploadStatus: 'pending'
    }));

    setImages(prev => [...prev, ...newImages]);

    // Upload each image
    for (const image of newImages) {
      try {
        // Update status to uploading
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, uploadStatus: 'uploading' } : img
        ));

        // Upload to Supabase
        const { path, error } = await uploadTrainingPhoto(user.id, image.file);
        
        if (error) {
          throw new Error(error);
        }

        // Update status to success
        setImages(prev => prev.map(img => 
          img.id === image.id ? { ...img, uploadStatus: 'success', path } : img
        ));
      } catch (error) {
        console.error('Error uploading photo:', error);
        // Update status to error
        setImages(prev => prev.map(img => 
          img.id === image.id ? { 
            ...img, 
            uploadStatus: 'error', 
            error: error instanceof Error ? error.message : 'Upload failed' 
          } : img
        ));
      }
    }
  };

  const removeImage = async (id: string) => {
    const imageToRemove = images.find(img => img.id === id);
    if (!imageToRemove || !user) return;

    setIsLoading(true);
    try {
      if (imageToRemove.uploadStatus === 'success' && imageToRemove.path) {
        const { error } = await deleteTrainingPhoto(user.id, imageToRemove.path);
        if (error) throw new Error(error);
      }
      
      // Remove from local state
      setImages(prev => prev.filter(img => img.id !== id));
      
      // Revoke the object URL to prevent memory leaks
      URL.revokeObjectURL(imageToRemove.previewUrl);
    } catch (error) {
      console.error('Error removing photo:', error);
      setError('Failed to remove photo. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    // Validate again before final submission
    if (!profile.consentAgreed) {
      setError('Please agree to the terms and conditions to continue');
      return;
    }
    if (images.length < MINIMUM_PHOTOS) {
      setError(`Please upload at least ${MINIMUM_PHOTOS} photos to continue`);
      return;
    }

    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);

      // First check if profile exists
      const { data: existingProfile } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_id', user.id)
        .single();

      const profileData = {
        user_id: user.id,
        name: profile.name,
        gender: profile.gender,
        age: profile.age,
        eye_color: profile.eyeColor,
        ethnicity: profile.ethnicity,
        hair_status: profile.hairStatus,
        plan_status: 'inactive' // Always set as inactive initially
      };

      let profileResult;
      
      if (existingProfile) {
        // Update existing profile
        profileResult = await supabase
          .from('user_profiles')
          .update(profileData)
          .eq('user_id', user.id);
      } else {
        // Insert new profile
        profileResult = await supabase
          .from('user_profiles')
          .insert([profileData]);
      }

      if (profileResult.error) {
        throw profileResult.error;
      }

      // Navigate to the generating page which will then redirect to pricing/subscribe
      navigate('/generating');
    } catch (err) {
      console.error('Error saving profile:', err);
      setError('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (step === 1 && (!profile.name || !profile.gender || !profile.age)) {
      setError('Please fill in all required fields');
      return;
    }
    if (step === 2 && (!profile.eyeColor || !profile.ethnicity || !profile.hairStatus)) {
      setError('Please fill in all required fields');
      return;
    }
    if (step === 3) {
      if (!profile.consentAgreed) {
        setError('Please agree to the terms and conditions to continue');
        return;
      }
      if (images.length < MINIMUM_PHOTOS) {
        setError(`Please upload at least ${MINIMUM_PHOTOS} photos to continue`);
        return;
      }
    }
    setError(null);
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setError(null);
    setStep(prev => prev - 1);
  };

  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <User2 className="w-6 h-6" />;
      case 2:
        return <Sparkles className="w-6 h-6" />;
      case 3:
        return <Camera className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-gray-100">
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-blue-500/5 animate-gradient"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,192,203,0.1),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 py-12 relative">
        <nav className="mb-12 flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="text-sm text-gray-400">
            Step {step} of 3
          </div>
        </nav>

        <div className="max-w-2xl mx-auto">
          {/* Enhanced Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${s !== 3 ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-500 relative group ${
                    s === step
                      ? 'border-pink-500 text-pink-500 scale-110'
                      : s < step
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-gray-600 text-gray-600'
                  }`}
                >
                  {s < step ? '✓' : getStepIcon(s)}
                  <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs whitespace-nowrap transition-opacity duration-300 ${
                    s === step ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {s === 1 ? 'Basic Info' : s === 2 ? 'Characteristics' : 'Photos'}
                  </div>
                </div>
                {s !== 3 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 transition-all duration-500 ${
                      s < step ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Enhanced Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-2 text-red-300 animate-[shake_0.5s_ease-in-out] backdrop-blur-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Enhanced Card Container */}
          <div className="bg-gray-800/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-700/50 shadow-xl transition-all duration-500 hover:shadow-pink-500/5">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-pink-500 bg-clip-text text-transparent">
                    Basic Information
                  </h2>
                  <div className="text-gray-400 text-sm flex items-center space-x-1">
                    <Info className="w-4 h-4" />
                    <span>Required</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Gender</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['man', 'woman'].map((gender) => (
                      <button
                        key={gender}
                        onClick={() => setProfile({ ...profile, gender: gender as 'man' | 'woman' })}
                        className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
                          profile.gender === gender
                            ? 'border-pink-500 bg-pink-500/20 text-white scale-[1.02]'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {gender.charAt(0).toUpperCase() + gender.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Age</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={profile.age}
                    onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Physical Characteristics */}
            {step === 2 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                <h2 className="text-2xl font-bold">Physical Characteristics</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Eye Color</label>
                  <select
                    value={profile.eyeColor}
                    onChange={(e) => setProfile({ ...profile, eyeColor: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  >
                    <option value="">Select eye color</option>
                    {EYE_COLORS.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Ethnicity</label>
                  <select
                    value={profile.ethnicity}
                    onChange={(e) => setProfile({ ...profile, ethnicity: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300"
                  >
                    <option value="">Select ethnicity</option>
                    {ETHNICITIES.map((ethnicity) => (
                      <option key={ethnicity} value={ethnicity}>
                        {ethnicity}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hair Status</label>
                  <div className="grid grid-cols-2 gap-4">
                    {['hair', 'bald'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setProfile({ ...profile, hairStatus: status as 'hair' | 'bald' })}
                        className={`px-4 py-3 rounded-lg border transition-all duration-300 ${
                          profile.hairStatus === status
                            ? 'border-pink-500 bg-pink-500/20 text-white scale-[1.02]'
                            : 'border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Photo Upload */}
            {step === 3 && (
              <div className="space-y-6 animate-[fadeIn_0.5s_ease-in-out]">
                <h2 className="text-2xl font-bold">Upload Your Photos</h2>
                <p className="text-gray-400">
                  Upload {MINIMUM_PHOTOS}-{MAX_PHOTOS} clear photos of yourself. Include different angles and expressions.
                </p>

                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center transition-all duration-300 hover:border-pink-500/50 group">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                    disabled={images.length >= MAX_PHOTOS || isLoading}
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`cursor-pointer flex flex-col items-center ${
                      images.length >= MAX_PHOTOS ? 'opacity-50' : ''
                    }`}
                  >
                    <Upload className="w-12 h-12 text-gray-500 mb-4 group-hover:text-pink-500 transition-colors" />
                    <span className="text-gray-400 group-hover:text-white transition-colors">
                      {images.length >= MAX_PHOTOS 
                        ? `Maximum ${MAX_PHOTOS} photos reached`
                        : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-sm text-gray-500">
                      PNG, JPG up to 10MB each ({images.length}/{MAX_PHOTOS} photos)
                    </span>
                  </label>
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-3 gap-4">
                    {images.map((image) => (
                      <div key={image.id} className="relative group animate-[fadeIn_0.3s_ease-in-out]">
                        <img
                          src={image.previewUrl}
                          alt="Preview"
                          className="w-full aspect-square object-cover rounded-lg transition-all duration-300 group-hover:scale-[1.02]"
                        />
                        <button
                          onClick={() => removeImage(image.id)}
                          disabled={isLoading}
                          className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          ×
                        </button>
                        {/* Upload Status Indicator */}
                        <div className={`absolute bottom-2 right-2 px-2 py-1 rounded text-xs ${
                          image.uploadStatus === 'success' ? 'bg-green-500/80' :
                          image.uploadStatus === 'error' ? 'bg-red-500/80' :
                          image.uploadStatus === 'uploading' ? 'bg-yellow-500/80' :
                          'bg-gray-500/80'
                        }`}>
                          {image.uploadStatus === 'success' ? 'Uploaded' :
                           image.uploadStatus === 'error' ? 'Failed' :
                           image.uploadStatus === 'uploading' ? 'Uploading...' :
                           'Pending'}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <label className={`flex items-center space-x-2 ${!profile.consentAgreed && 'animate-[shake_0.5s_ease-in-out]'}`}>
                    <input
                      type="checkbox"
                      checked={profile.consentAgreed}
                      onChange={(e) => setProfile({ ...profile, consentAgreed: e.target.checked })}
                      className={`rounded border-gray-700 text-pink-500 focus:ring-pink-500 transition-colors ${
                        !profile.consentAgreed ? 'border-red-500' : ''
                      }`}
                    />
                    <span className={`text-sm ${!profile.consentAgreed ? 'text-red-400' : 'text-gray-400'}`}>
                      I agree to the terms and conditions and consent to AI model training
                    </span>
                  </label>
                  
                  {/* Photo count indicator */}
                  <div className="flex items-center justify-between text-sm">
                    <span className={`${
                      images.length < MINIMUM_PHOTOS ? 'text-red-400' : 'text-green-400'
                    }`}>
                      {images.length} of {MINIMUM_PHOTOS} required photos uploaded
                    </span>
                    <span className="text-gray-400">
                      Maximum: {MAX_PHOTOS} photos
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={prevStep}
                  className="px-6 py-3 text-gray-400 hover:text-white transition-colors flex items-center space-x-2 hover:bg-white/5 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span>Back</span>
                </button>
              )}
              <div className="flex-1" />
              <button
                onClick={step === 3 ? handleSubmit : nextStep}
                disabled={isLoading}
                className={`px-8 py-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                  isLoading 
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:from-pink-600 hover:to-rose-600 hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-500/25'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <span>{step === 3 ? 'Create My Model' : 'Continue'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}