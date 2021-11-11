import React, { useEffect, useState } from "react";
import { Video } from "./Video";
import VideoItem from "./VideoItem";
import * as VideoService from "./VideoService";
const VideoList = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const loadVideos = async () => {
    const res = await VideoService.getVideos();
    const formatedvideos = res.data.map(video=>{
      return{
        ...video,
        createdAt: video.createdAt? new Date(video.createdAt): new Date(),
        updatedAt: video.updatedAt? new Date(video.updatedAt): new Date()
      }
    })
    .sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime());
    setVideos(formatedvideos);
  };

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <div className="row">
      {videos.map((video) => {
        return <VideoItem video={video} key={video._id} loadVideos={loadVideos}/>
      })}
    </div>
  );
};

export default VideoList;
