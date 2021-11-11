import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Video } from "./Video";
import * as VideoService from "./VideoService";
import { toast } from "react-toastify";

type InputChange = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

/* interface Params{
  id:string;
} */

const VideoForm = () => {
  const navigate = useNavigate();
  const params = useParams();

  const initialState = {
    title: "",
    url: "",
    description: "",
  };

  const [video, setVideo] = useState<Video>(initialState);
  const hadleInputChange = (e: InputChange) => {
    setVideo({ ...video, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params.id) {
      await VideoService.createVideo(video);
      toast.success("New video added");
      setVideo(initialState);
    }else{
      await VideoService.updateVideo(params.id,video);
      toast.info("Video updated");
      setVideo(initialState);
    }
    navigate("/");
  };

  const getVideo = async (id: string) => {
    const res = await VideoService.getVideo(id);
    const { title, url, description } = res.data;
    setVideo({ title, url, description });
  };
  useEffect(() => {
    if (params.id) getVideo(params.id);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-md-4 offset-md-4">
        <div className="card">
          <div className="card-body">
            <h3>New Video</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="title"
                  placeholder="Write a title"
                  className="form-control"
                  onChange={hadleInputChange}
                  value={video.title}
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="url"
                  placeholder="https://example.com"
                  className="form-control"
                  onChange={hadleInputChange}
                  value={video.url}
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="description"
                  rows={3}
                  className="form-control"
                  placeholder="Write a description"
                  onChange={hadleInputChange}
                  value={video.description}
                ></textarea>
              </div>
              <div className="d-grid">
                {params.id ? (
                  <button className="btn btn-info">Update Video</button>
                ) : (
                  <button className="btn btn-primary">Create Video</button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoForm;
