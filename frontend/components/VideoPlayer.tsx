"use client";
import React, { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps, YouTubePlayer } from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
}

export default function VideoPlayer({ videoId }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<YouTubePlayer | null>(null);

  const onReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target;
  };

  const onStateChange: YouTubeProps['onStateChange'] = (event) => {
    if (event.data === YouTube.PlayerState.PLAYING) setIsPlaying(true);
    else setIsPlaying(false);
  };

  const opts: YouTubeProps['opts'] = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      showinfo: 0,
      color: 'white',
      controls: 1,
    },
  };

  return (
    <div className="w-full aspect-video bg-black rounded-[24px] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.15)] ring-4 ring-white/50 border border-slate-200">
      <YouTube 
        videoId={videoId} 
        opts={opts} 
        onReady={onReady} 
        onStateChange={onStateChange} 
        className="absolute inset-0 w-full h-full"
        iframeClassName="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
}
