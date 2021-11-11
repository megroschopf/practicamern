import React from "react";
import { Video } from "./Video";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import * as videoService from './VideoService'
import "./VideoItem.css";
interface Props {
  video: Video;
  loadVideos:()=>void;
}
const VideoItem = ({ video, loadVideos }: Props) => {
  const navigate = useNavigate();
  const handleDelete = async(id:string)=>{
    await videoService.deleteVideo(id)
    loadVideos();
  }
  return (
    <div className="col-md-4">
      <div className="card card-body video-card">
        <div className="d-flex justify-content-between">
          <h2 onClick={() => navigate(`/update/${video._id}`)}>
            {video.title}
          </h2>
          {/* <span>
            <div className="btn-group btn-group-sm">
              <div className="btn btn-info">Update</div>
              <div className="btn btn-danger">Delete</div>
            </div>
          </span> */}
          <span className="text-danger" onClick={() =>video._id && handleDelete(video._id)}>
            X
          </span>
        </div>
        <p>{video.description}</p>
        <ReactPlayer width="16" height="9" controls={true} url={video.url} />
      </div>
    </div>
  );
};

export default VideoItem;
