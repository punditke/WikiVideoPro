import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  HiOutlineX, 
  HiOutlineLink, 
  HiOutlineDownload, 
  HiOutlineExternalLink,
  HiOutlineInformationCircle,
  HiOutlineUser,
  HiOutlineTag
} from 'react-icons/hi';

export default function CinematicTheater({ video, onClose }) {
  const videoRef = useRef();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.url);
  };

  const handleViewOnCommons = () => {
    window.open(video.url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-xl"
    >
      <div className="relative w-full max-w-7xl bg-zinc-900/90 rounded-2xl border border-white/10 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 text-zinc-400 hover:text-white transition-colors"
        >
          <HiOutlineX className="w-5 h-5" />
        </button>

        <div className="flex flex-col lg:flex-row h-[80vh]">
          {/* Video Player Section */}
          <div className="lg:w-[70%] bg-black/50 flex items-center justify-center p-4">
            {video.fileUrl ? (
              <video
                ref={videoRef}
                src={video.fileUrl}
                controls
                autoPlay
                className="w-full h-full rounded-xl"
                poster={video.thumbnail}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <div className="text-zinc-500">Video not available</div>
            )}
          </div>

          {/* Asset Intelligence Panel */}
          <div className="lg:w-[30%] border-l border-white/5 bg-zinc-900/50 overflow-y-auto p-6">
            <h2 className="font-playfair text-2xl font-bold text-white mb-4">
              Asset Intelligence
            </h2>

            <div className="space-y-6">
              {/* Metadata */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <HiOutlineInformationCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-inter text-xs text-zinc-500">Title</p>
                    <p className="font-inter text-sm text-white">
                      {video.title?.replace(/_/g, ' ')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiOutlineUser className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-inter text-xs text-zinc-500">Creator</p>
                    <p className="font-inter text-sm text-white" 
                       dangerouslySetInnerHTML={{ __html: video.artist || 'Unknown' }} />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <HiOutlineTag className="w-5 h-5 text-emerald-400 mt-0.5" />
                  <div>
                    <p className="font-inter text-xs text-zinc-500">License</p>
                    <p className="font-inter text-sm text-emerald-400">
                      {video.license}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="bg-black/30 rounded-lg p-4 border border-white/5">
                <h3 className="font-inter text-sm font-medium text-white mb-3">
                  Technical Specifications
                </h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="font-inter text-xs text-zinc-500">Format</dt>
                    <dd className="font-inter text-xs text-white">
                      {video.mime?.split('/').pop()?.toUpperCase() || 'Unknown'}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="font-inter text-xs text-zinc-500">Duration</dt>
                    <dd className="font-inter text-xs text-white">{video.duration}</dd>
                  </div>
                </dl>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-between px-4 py-3 bg-black/30 rounded-lg border border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all group"
                >
                  <span className="font-inter text-sm">Copy Link</span>
                  <HiOutlineLink className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400" />
                </button>

                <button
                  onClick={handleViewOnCommons}
                  className="w-full flex items-center justify-between px-4 py-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
                >
                  <span className="font-inter text-sm text-emerald-400">View on Commons</span>
                  <HiOutlineExternalLink className="w-5 h-5 text-emerald-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
            }
