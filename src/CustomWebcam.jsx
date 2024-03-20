import Webcam from "react-webcam";
import './CustomWebcam.css'
import { useCallback, useRef, useState } from "react";

const CustomWebcam = () => {
  const webcamRef = useRef(null);
  const [isFrontFacing, setIsFrontFacing] = useState(true);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    const now = new Date();
    const datePart = now.toISOString().split("T")[0];
    const timePart = now.toLocaleTimeString().replace(/:/g, "-");
    const imageName = `${datePart}_${timePart}.jpg`;
    const link = document.createElement("a");
    link.href = imageSrc;
    link.setAttribute("download", `../imagefolder/${imageName}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [webcamRef]);

  const toggleFacingMode = () => {
    setIsFrontFacing((prev) => !prev);
  };

  const videoConstraints = isFrontFacing
    ? {
        width: { min: 480 },
        height: { min: 720 },
        facingMode: "user",
      }
    : {
        width: { min: 480 },
        height: { min: 720 },
        facingMode: { exact: "environment" },
      };

  return (
    <div className="container">
      <Webcam
        height={videoConstraints.height}
        width={videoConstraints.height}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      <div className="btn-container">
        <button onClick={capture}>Capture photo</button>
        <button onClick={toggleFacingMode}>Reverse Cam</button>
      </div>
    </div>
  );
};

export default CustomWebcam;


