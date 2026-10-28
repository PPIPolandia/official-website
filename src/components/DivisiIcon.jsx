import React from 'react';
import {
  GraduationCap,
  Users,
  Target,
  Trophy,
  Sparkles,
  Globe,
  BookOpen,
  Briefcase,
  HeartHandshake,
  Megaphone,
  Camera,
  Laptop,
  Shield,
  Compass,
  Award,
  Music
} from 'lucide-react';

export const DIVISION_ICONS = [
  { name: 'GraduationCap', Icon: GraduationCap },
  { name: 'Users', Icon: Users },
  { name: 'Target', Icon: Target },
  { name: 'Trophy', Icon: Trophy },
  { name: 'Sparkles', Icon: Sparkles },
  { name: 'Globe', Icon: Globe },
  { name: 'BookOpen', Icon: BookOpen },
  { name: 'Briefcase', Icon: Briefcase },
  { name: 'HeartHandshake', Icon: HeartHandshake },
  { name: 'Megaphone', Icon: Megaphone },
  { name: 'Camera', Icon: Camera },
  { name: 'Laptop', Icon: Laptop },
  { name: 'Shield', Icon: Shield },
  { name: 'Compass', Icon: Compass },
  { name: 'Award', Icon: Award },
  { name: 'Music', Icon: Music }
];

export const DivisiIcon = ({ name, size = 32, color = 'var(--primary)', className = '' }) => {
  const iconObj = DIVISION_ICONS.find(item => item.name === name);
  const IconComponent = iconObj ? iconObj.Icon : Target;
  return <IconComponent size={size} color={color} className={className} />;
};
