import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import Comment from "./Comment";

function VideoDetails() {
  const [video, setVideo] = useState(null); // Set default state to null
  const [comments, setComments] = useState([]);
  const params = useParams();

  // Get comments based on video ID
//   function getComments(videoId) {
//     fetch(`https://youtube-tsz1.onrender.com/comments/${videoId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         // Assuming the response structure is { comments: [...] }
//         setComments(data.comments);
//       })
//       .catch((error) => {
//         console.error("Error fetching comments:", error);
//       });
//   }

  useEffect(() => {
    fetch('https://youtube-clone-backend-jwhl.onrender.com/video/all-video', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Ensure `data.allvideos` contains video objects
        const oneVideo = data.allvideos.find((video) => video._id === params.id);
        // if (oneVideo) {
        //   setVideo(oneVideo);
        //   getComments(oneVideo._id); // Fetch comments for this video
        // }
        setVideo(oneVideo)
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
      });
  }, [params.id]); // Re-run effect when video ID changes

  return (
    <div>
      {video ? (
        <div>
          <h3>Video Details - {params.id}</h3>
          <div>
            <video width="640" height="360" controls>
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          {/* <div>
            {comments.length > 0 ? (
              comments.map((comment) => {
                return <Comment commentData={comment} key={comment._id} />;
              })
            ) : (
              <p>No comments available</p>
            )}
          </div> */}
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
}

export default VideoDetails;
