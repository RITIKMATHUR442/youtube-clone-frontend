import PropTypes from "prop-types";

ShowVideo.propTypes = {
  videoData: PropTypes.object,
};

function ShowVideo(props) {
  console.log(props);
  const video = props.videoData;

  return (
    <>
      <div className="Thumbnail_Container">
        <div className="Thumbnail">
          {/* Corrected string interpolation */}
          <img
            src={video.thumbnailUrl} // Use video.thumbnailUrl directly
            alt=""
            width="300px"
            height="150px"
          />
        </div>
        <div className="Video_Details">
          <h4>{video.tittle}</h4>
          <h6>{video.description}</h6>
        </div>
      </div>
    </>
  );
}

export default ShowVideo;
