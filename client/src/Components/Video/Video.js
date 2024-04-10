import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import "./Video.css";
// import Loading from "../Loading/Loading";

const Video = () => {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(2);

  useEffect(() => {
    axios
      .get("https://nishchayphotographyapi.onrender.com/videofetching")
      .then((res) => {
        setLoading(true);
        setVideoData(res.data);
        console.log(res.data);
      })
      .then((err) => {
        console.log(err);
      });

    window.addEventListener("scroll", handelScrolling);
    return () => window.removeEventListener("scroll", handelScrolling);
  }, [page]);

  const handelScrolling = () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="video-section">
        <div className="video-title-section container">
          <hr></hr>
          <h1>Youtube Video.</h1>
          <hr style={{ backgroundColor: "#b55467" }}></hr>
        </div>
        {loading ? (
          <div className="youtube-viedo-section container p-5 ">
            {videoData.map((item) => {
              return (
                <>
                  <div className="video-card p-3">
                    <iframe
                      src={item.video}
                      title="youtube_video"
                      style={{ width: "100%" }}
                    />
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <Loader />
        )}

        <br></br>
      </div>
      <Footer />
    </>
  );
};

export default Video;
