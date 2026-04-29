import React, { useEffect, useState } from 'react';
import { youtubeAPI } from '../../services/api';
import './YouTubeGrid.css';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
}

const YouTubeGrid: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await youtubeAPI.getLatestVideos();
        if (response.data.success) {
          setVideos(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching YouTube videos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 6);
  };

  if (loading && videos.length === 0) {
    return (
      <section className="youtube-grid-section">
        <div className="container">
          <div className="section-header">
            <div className="skeleton title-skeleton"></div>
            <div className="skeleton subtitle-skeleton"></div>
          </div>
          <div className="video-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="video-card skeleton-card">
                <div className="thumbnail-wrapper skeleton"></div>
                <div className="video-info">
                  <div className="skeleton line-skeleton"></div>
                  <div className="skeleton line-skeleton short"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (videos.length === 0) {
    return null;
  }

  const displayedVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  return (
    <section className="youtube-grid-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title text-black text-4xl sm:text-5xl font-bold mb-4 font-fraunces text-center">Latest from Get a Dream Home</h2>
          <p className="section-subtitle text-lg text-[#4B5563] mb-8 max-w-2xl mx-auto font-manrope text-center">Stay updated with our newest property walkthroughs and real estate insights</p>
          <div className="flex justify-center mb-12">
            <a
              href="https://www.youtube.com/@Hanumant_properties"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF0000] text-white rounded-lg font-bold hover:bg-[#CC0000] transition-all shadow-md active:scale-95"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Subscribe to our Channel
            </a>
          </div>
        </div>

        <div className="video-grid">
          {displayedVideos.map((video) => (
            <a
              key={video.id}
              href={video.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card-v2 group"
            >
              <div className="thumbnail-wrapper-v2 overflow-hidden rounded-2xl relative aspect-video">
                <img src={video.thumbnail} alt={video.title} className="video-thumbnail-v2 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="play-overlay-v2 absolute inset-0 bg-[#1F3A5F]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="play-icon-v2 bg-black text-white p-4 rounded-full shadow-xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="video-info-v2 mt-4">
                <h3 className="video-title-v2 text-xl font-bold text-[#1F2937] group-hover:text-black transition-colors line-clamp-2 font-fraunces">{video.title}</h3>
              </div>
            </a>
          ))}
        </div>

        {hasMore && (
          <div className="load-more-container mt-16 text-center">
            <button
              onClick={handleLoadMore}
              className="px-10 py-4 bg-black text-white font-bold rounded-lg hover:bg-[#0EA5E9] transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 active:scale-95"
            >
              Load More Videos
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default YouTubeGrid;
