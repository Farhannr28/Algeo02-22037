// import React, { useRef, useEffect, useState } from "react";

// function Camera() {
//   const videoRef = useRef(null);
//   const photoRef = useRef(null);

//   const [hasPhoto, setHasPhoto] = useState(false);

//   const getVideo = () => {
//     navigator.mediaDevices
//       .getUserMedia({ video: { width: 500, height: 500 } })
//       .then((stream) => {
//         let video = videoRef.current;
//         video.srcObject = stream;
//         video.play();
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   const takePhoto = () => {
//     const width = 500;
//     const height = 500;

//     let video = videoRef.current;
//     let photo = photoRef.current;

//     photo.width = width;
//     photo.height = height;

//     let ctx = photo.getContext("2d");
//     ctx.drawImage(video, 0, 0, width, height);
//     setHasPhoto(true);
//   };

//   const closePhoto = () => {
//     let photo = photoRef.current;
//     let ctx = photo.getContext("2d");

//     ctx.clearRect(0, 0, photo.width, photo.height);
//     setHasPhoto(false);
//   };

//   useEffect(() => {
//     getVideo();
//   }, [videoRef]);

//   return (
//     <div>
//       <div className="camera">
//         <video ref={videoRef} className="hidden"></video>
//         <button onClick={takePhoto}>Camera</button>
//       </div>
//       <div className={"result" + (hasPhoto ? "hasPhoto" : "")}>
//         <canvas ref={photoRef}></canvas>
//         <button onClick={closePhoto}>close</button>
//       </div>
//     </div>
//   );
// }

// export default Camera;

// Camera.js
// Camera.js
import React, { useRef, useState } from "react";

const Camera = () => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const saveImageToServer = (imageDataUrl) => {
    fetch(
      `http://localhost:3000/saveImage?imageDataUrl=${encodeURIComponent(
        imageDataUrl
      )}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error:", error));
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set ukuran canvas sesuai dengan ukuran video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Gambar frame video ke canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Ambil data gambar dari canvas
    const imageData = canvas.toDataURL("image/jpeg");

    // Simpan gambar di localStorage
    localStorage.setItem("capturedImage", imageData);

    // Set gambar yang telah diambil ke state
    setCapturedImage(imageData);

    //simpan
    saveImageToServer(imageData);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      <button onClick={captureImage}>Capture Image</button>
      {capturedImage && (
        <div>
          <h2>Captured Image</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default Camera;
