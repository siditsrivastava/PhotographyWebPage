import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Loader from "../Loader/Loader";
import d from '../image/d.jpg';
import eightImg from '../image/eightImg.jpg';
import firstImg from '../image/firstImg.jpg';
import fortheen from '../image/fortheen.jpg';
import ninethImg from '../image/ninethImg.jpeg';
import sixthImg from '../image/sixthImg.jpg';
import thirdImg from '../image/thirdImg.jpeg';
import thirdteenImg from '../image/thirdteenImg.jpg';
import twelveImg from '../image/twelveImg.webp';
import "./Gallery.css";

// import {INSTRAGRAM_ACCESS_KEY , INSTRAGRAM_TOKEN_KEY} from ''

const Gallery = () => {
  const [galleryPhotos, setGalleryPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState();
  const [show, setShow] = useState(false);
  const [model, setModel] = useState(false);
  const [temImg, setTemImg] = useState("");


  const getImg = (media_url) => {
    setTemImg(media_url);
    setModel(true);
  };

  // const  pic = [
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},
  //   {media_url : "../image/firstImg.jpeg"},


  // ]

  useEffect(() => {
    axios
      // .get(
      //   "https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,like,media_type&expires_in:5183944&client_secret=95fb657c7fdf472fcb6eaad689799db7&access_token=IGQWRQbHBXX3JPd2F2bFFxX0dWVnBhM2FsTEpWVm9xT0p3MnR3Vl9zcm1obzM5ZAUpEeDNUY3NvdklPalV4XzdVdGxQaTFmVmNSUDF5TzRHV3JZAdHV2OHBxM1A0NXFVS1pDWkpyRUNaUG52aGFyNTgtRlV1a0x5RzQZD"
      // )
      .get(
        `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp,like,media_type&expires_in:5183944&client_secret=${process.env.RECT_APP_ACCESS_KEY}&access_token=${process.env.REACT_APP_TOKEN_KEY}`
      )
      .then((res) => {
        setLoading(true);
        const mediaData = res.data;
        setGalleryPhotos(mediaData.data);
        // console.log(mediaData);
      })
      .catch((err) => {
        // console.log(err.message);
        setError(err.message);

      });
    // window.addEventListener("scroll" , handelInfiniteScrolls)
    // return() => window.removeEventListener("scroll" , handelInfiniteScrolls)
    // }, [page]);
  }, []);

  // const handelInfiniteScrolls = () => {
  //   try{
  //     if(window.innerHeight + document.documentElement.scrollTop + 1 >=
  //       document.documentElement.scrollHeight){
  //           // setLoading(false)
  //           setPage((prev) => prev + 1);
  //       }
  //   }catch(err){
  //       console.log(err)
  //   }
  // }
  const filterItems = (items) => {
    const updatedItem = galleryPhotos.filter((curElem) => {
      return curElem.media_type === items;
    });
    setData(updatedItem);
    console.log(updatedItem);
  };

  return (
    <>
      <Header />
      <div className="gallery-section">
        <div className="Gallery-image-section container">
        <br></br>
          <h1>IMAGE.</h1>
          <hr style={{ backgroundColor: "#b55467" }}></hr>
        </div>
        <br></br>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-[5rem] ml-2 mr-2">
        <img src={twelveImg} className="w-full brightness-75 hover:brightness-100" alt="image" />
      <img src={eightImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={thirdteenImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={firstImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={ninethImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={thirdImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={fortheen} className="w-full brightness-75 hover:brightness-100" alt="image" />
      <img src={sixthImg} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      <img src={d} className="w-full brightness-75 hover:brightness-100" alt="Image" />
      </div>
        {error ? (
          <h4 className="error" style={{ textAlign: "center" }}>
            {/* {error} */}
          </h4>
        ) : (
          <>
            <div className="search-btn">
              <button className="btn" onClick={() => setData(galleryPhotos)}>
                ALL
              </button>
              <button
                className="btn"
                onClick={() => [filterItems("VIDEO"), setShow(true)]}
              >
                VIDEO
              </button>
              <button
                className="btn"
                onClick={() => [filterItems("IMAGE"), setShow(true)]}
              >
                PHOTO
              </button>
            </div>
            <br></br>
            <div className={model ? "model open" : "model"}>
              <img src={temImg} alt="NOopen" />
              <i class="fa-solid fa-xmark" onClick={() => setModel(false)}></i>
            </div>
            {loading ? (
              <div className="gallery container">
                {show
                  ? data.map((items) => {
                      return (
                        <>
                          {loading ? (
                            items.media_type === "IMAGE" ? (
                              <div
                                className="pics"
                                onClick={() => getImg(items.media_url)}
                                key={items.id}
                              >
                                <img
                                  src={items.media_url}
                                  alt="NotImageFound !!"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            ) : (
                              <div className="pics" key={items.id}>
                                <video
                                  controls
                                  style={{ width: "100%", height: "100%" }}
                                  src={items.media_url}
                                />
                              </div>
                            )
                          ) : null
                          }
                        </>
                      );
                    })
                  : galleryPhotos.map((items) => {
                      return (
                        <>
                          {loading ? (
                            items.media_type === "IMAGE" ? (
                              <div
                                className="pics"
                                onClick={() => getImg(items.media_url)}
                                key={items.id}
                              >
                                <img
                                  src={items.media_url}
                                  alt="NotImageFound !!"
                                  style={{ width: "100%" }}
                                />
                              </div>
                            ) : (
                              <div className="pics" key={items.id}>
                                <video
                                  controls
                                  style={{ width: "100%", height: "100%" }}
                                  src={items.media_url}
                                />
                              </div>
                            )
                          ) : null}
                        </>
                      );
                    })}
              </div>
            ) : (
              <Loader />
            )}     
          </>
        )}
        <br></br>
      </div>
      
      <Footer />
    </>
  );
};

export default Gallery;
