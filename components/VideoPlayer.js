'use client';

import { useRef } from 'react';
import { HiOutlineUser, HiOutlineTag } from 'react-icons/hi';

export default function VideoPlayer({ video }) {
  const videoRef = useRef();

  return (
    <div className="space-y-6">
      {/* Player */}
      <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/5">
        <video
          ref={videoRef}
          src={video.fileUrl}
          controls
          className="w-full h-full"
          poster={video.thumbnail}
        />
      </div>

      {/* Metadata block – directly below player */}
      <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-xl p-6">
        <h1 className="font-playfair text-3xl font-bold text-white mb-2">
          {video.title?.replace(/_/g, ' ')}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
          <div className="flex items-center gap-1">
            <HiOutlineUser className="w-4 h-4" />
            <span dangerouslySetInnerHTML={{ __html: video.artist || 'Unknown' }} />
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineTag className="w-4 h-4" />
            <span>{video.license}</span>
          </div>
          <span>{video.duration}</span>
        </div>

        {video.description && (
          <p className="mt-4 text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: video.description }} />
        )}
      </div>
    </div>
  );
}
