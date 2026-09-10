export interface Img { src: string; srcset: string; width: number; height: number }
export interface WorkItem {
  slug: string;
  title: string;
  sector: string;
  category: string;
  city: string;
  location: string;
  year?: string;
  alt: string;
  cover: Img;
  preview: string;
  gallery: Img[];
}
export interface ArchiveItem {
  title: string;
  sector: string;
  category: string;
  city: string;
  location: string;
  year?: string;
}
export interface SectorOption { key: string; label: string; count: number }
