const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const getImageSrc = (image, fallback = '/placeholder.png') => {
  if (!image) return fallback;
  if (image.startsWith('http') || image.startsWith('data:')) return image;
  return `${API_BASE}${image}`;
};

export default getImageSrc;
