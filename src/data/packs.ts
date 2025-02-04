import { Users, Heart, Flame, Briefcase, Music, Sparkles, Camera, Book, Presentation, DollarSign, Crown, Instagram, Globe, Trees as Tree, Leaf, PartyPopper, Star, GraduationCap, Trophy } from 'lucide-react';
import type { Pack } from './types';

// Homepage packs
export const packs: Pack[] = [
  {
    name: "All Access",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1600096194534-95cf5ece04cf?q=80&w=800&auto=format&fit=crop",
    description: "Get 100 AI-generated photos every month. Perfect for consistent content creation.",
    includes: [
      "100 photos per month",
      "All styles & settings",
      "Priority generation",
      "Advanced editing options",
      "Commercial usage rights"
    ],
    price: "$19.99/mo",
    popular: true,
    subscription: true
  },
  {
    name: "Dating Pack",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    description: "Perfect for dating apps. Get photos that show your best self and attract more matches.",
    includes: [
      "20 photos",
      "Dating-optimized poses",
      "Natural lighting",
      "Multiple outfits",
      "Personal usage rights"
    ],
    price: "$15.99"
  },
  {
    name: "Professional Pack",
    icon: Briefcase,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    description: "Ideal for business professionals. Get a set of polished, professional photos.",
    includes: [
      "15 photos",
      "Professional poses",
      "Office settings",
      "Multiple backgrounds",
      "Commercial usage rights"
    ],
    price: "$25.99"
  }
];

// Dashboard packs
export const dashboardPacks: Pack[] = [
  {
    name: "Tinder Pack",
    icon: Heart,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725056080-41811dd82a5826be0c829deb8d941ebc-1.png",
    description: "Perfect for Tinder. Casual, approachable photos that get more matches.",
    includes: ["Natural lighting", "Casual outfits", "Relaxed poses"],
    prompt: "Casual outdoor portrait, natural lighting, relaxed pose, friendly smile, dating profile style"
  },
  {
    name: "Hinge Pack",
    icon: Camera,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725044582-03d14641e315eb4fbb75b14ed91df6c1-1.png",
    description: "Tailored for Hinge. Sophisticated yet approachable photos.",
    includes: ["Urban settings", "Professional style", "Natural expressions"],
    prompt: "Urban lifestyle portrait, sophisticated casual wear, genuine expression, high-end dating profile"
  },
  {
    name: "Instagram Pack",
    icon: Instagram,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726224200-c684e623de1e13a8f7b7dcbc751e8cee-3.png",
    description: "Create stunning content for your Instagram feed.",
    includes: ["Social media optimized", "Lifestyle shots", "Trendy aesthetics"],
    prompt: "Instagram lifestyle portrait, trendy aesthetic, perfect for social media, high engagement style"
  },
  {
    name: "Digital Nomad",
    icon: Globe,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726216256-d590b0b7931af737480eea414a074ca2-4.png",
    description: "Remote work and travel lifestyle photos.",
    includes: ["Travel settings", "Work-life balance", "Adventure vibes"],
    prompt: "Digital nomad lifestyle portrait, remote work setting, travel aesthetic, adventurous vibe"
  },
  {
    name: "Outdoorsy",
    icon: Tree,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1725049039-8e0a6fecddca70871bb90be165a0527a-1.png",
    description: "Adventure and nature-focused photos.",
    includes: ["Outdoor settings", "Adventure gear", "Natural backdrops"],
    prompt: "Outdoor adventure portrait, natural scenery, active lifestyle, authentic outdoor experience"
  },
  {
    name: "Nature",
    icon: Leaf,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1725073967-33f22b2263707742274731fda166386b-1.png",
    description: "Connect with nature in beautiful settings.",
    includes: ["Natural environments", "Scenic backdrops", "Organic poses"],
    prompt: "Nature-inspired portrait, scenic natural background, organic pose, environmental harmony"
  },
  {
    name: "Music Festival",
    icon: Music,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1725061567-da61f8c1641cb277436a68de91577f91-1.png",
    description: "Festival vibes and music scene photos.",
    includes: ["Festival atmosphere", "Concert lighting", "Dynamic poses"],
    prompt: "Music festival portrait, vibrant atmosphere, concert lighting, energetic festival vibe"
  },
  {
    name: "Party Animal",
    icon: PartyPopper,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726613587-f30f342e27780d7b4ab58b0855c934ab-4.png",
    description: "Fun, energetic nightlife photos.",
    includes: ["Club settings", "Party vibes", "Dynamic lighting"],
    prompt: "Nightlife portrait, club atmosphere, party energy, vibrant nighttime setting"
  },
  {
    name: "Celebrity",
    icon: Star,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1738427988-726b1be5eb13750734bc3d33c8bda213-3.png",
    description: "High-end celebrity-style photoshoot.",
    includes: ["Premium settings", "Luxury style", "Professional lighting"],
    prompt: "Celebrity style portrait, premium setting, luxury aesthetic, professional studio lighting"
  },
  {
    name: "Graduation",
    icon: GraduationCap,
    image: "https://photoai.com/cdn-cgi/image/format=jpeg,fit=cover,width=300,height=450,quality=50/https://r2-us-west.photoai.com/1726236537-efbcb058e93cd19c4dc72c4c325547b0-2.png",
    description: "Celebrate your academic achievements.",
    includes: ["Academic settings", "Formal poses", "Celebration moments"],
    prompt: "Graduation portrait, academic setting, celebratory moment, achievement focused"
  },
  {
    name: "Sports Player",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop",
    description: "Athletic and sports-focused photos.",
    includes: ["Sports settings", "Action shots", "Athletic gear"],
    prompt: "Athletic portrait, sports setting, dynamic action pose, professional sports aesthetic"
  },
  {
    name: "Professional Pack",
    icon: Briefcase,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725058707-ec3de519817b1f558f9c94eb4f20800d-1.png",
    description: "Corporate-ready photos for your professional profile.",
    includes: ["Office settings", "Business attire", "Professional poses"],
    prompt: "Professional corporate headshot, office setting, business attire, confident pose"
  },
  {
    name: "Nice Guy Pack",
    icon: Heart,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725079537-e4a869a01fa45edcc29e2b1c81977452-1.png",
    description: "Friendly, approachable photos that show your genuine side.",
    includes: ["Casual settings", "Warm smiles", "Relaxed poses"],
    prompt: "Friendly casual portrait, warm genuine smile, approachable pose, natural setting"
  },
  {
    name: "Genius Pack",
    icon: Book,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725074346-cef712163cd2f0e10cbede130a6fdae2-1.png",
    description: "Intellectual vibes for academics and thought leaders.",
    includes: ["Library settings", "Reading poses", "Thoughtful expressions"],
    prompt: "Intellectual portrait, library or study setting, thoughtful expression, professional casual attire"
  },
  {
    name: "Keynote Pack",
    icon: Presentation,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725049228-59e5679be5ad1ee0f05c529c09f2f50d-1.png",
    description: "Dynamic photos for speakers and presenters.",
    includes: ["Stage presence", "Speaking poses", "Audience engagement"],
    prompt: "Professional speaker portrait, conference or stage setting, engaging pose, business professional attire"
  },
  {
    name: "Rich Guy Pack",
    icon: DollarSign,
    image: "https://r2-us-west.photoai.com/1738525423-ddf74af0cd2c487dff9921127f2e41af-4.png",
    description: "Luxury lifestyle photos that exude success.",
    includes: ["Luxury settings", "High-end style", "Sophisticated poses"],
    prompt: "Luxury lifestyle portrait, high-end setting, sophisticated pose, premium fashion"
  },
  {
    name: "The Top 1%",
    icon: Crown,
    image: "https://photoai.com/cdn-cgi/image/format=auto,fit=cover,width=512,height=768,quality=85/https://r2-us-west.photoai.com/1725085232-5116c603d13cadd719e82cb4b6228dd4-1.png",
    description: "Our most successful poses based on dating app performance.",
    includes: ["Proven poses", "Optimal lighting", "Perfect angles"],
    price: "$9.99",
    prompt: "Premium dating profile photo, proven successful pose, perfect lighting, optimal angle"
  }
];