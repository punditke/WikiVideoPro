'use client';

import { motion } from 'framer-motion';
import { HiOutlineFilm, HiOutlineClock } from 'react-icons/hi';
import Link from 'next/link';

export default function VideoCard({ video, view = 'grid' }) {
  const cardContent = (
    <div className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden bg-zinc-900/50 border border-white/5">
        <div className="aspect-video">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title?.replace(/_/g, ' ')}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-zinc-800">
              <HiOutlineFilm className="w-8 h-8 text-zinc-600" />
            </div>
          )}
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex space-x-2">
          {video.mime?.includes('video') && (
            <span className="px-2 py-1 text-xs font-inter bg-black/60 backdrop-blur-sm rounded-md border border-white/10 text-white">
              MP4
            </span>
          )}
        </div>
        
        <div className="absolute bottom-3 right-3">
          <span className="px-2 py-1 text-xs font-inter bg-black/60 backdrop-blur-sm rounded-md border border-white/10 text-white flex items-center">
            <HiOutlineClock className="w-3 h-3 mr-1" />
            {video.duration}
          </span>
        </div>
      </div>
      
      <div className="mt-3">
        <h3 className="font-inter text-sm font-medium text-white line-clamp-1">
          {video.title?.replace(/_/g, ' ') || 'Untitled'}
        </h3>
      </div>
    </div>
  );

  // Wrap with Link for grid view, return as-is for list view (you can adjust list view later)
  return view === 'grid' ? (
    <Link href={`/video/${video.id}`} passHref>
      {cardContent}
    </Link>
  ) : (
    cardContent
  );
                }
