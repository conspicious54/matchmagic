import type { LucideIcon } from 'lucide-react';

export interface Pack {
  name: string;
  icon: LucideIcon;
  image: string;
  description: string;
  includes: string[];
  price?: string;
  popular?: boolean;
  subscription?: boolean;
  prompt?: string;
}

export interface ExamplePhoto {
  url: string;
  prompt: string;
  style: string;
  cameraAngle: string;
  photoCount: number;
  cameraType: string;
}