import React from 'react';
import Webcam from "react-webcam";
import ModalOne from '../layout/Modal';
import Button from './Button';
import BACKEND from "../utils/backend";

const Api = new BACKEND();

const videoConstraints = {
 width: 1280,
 height: 5020,
 facingMode: { exact: "environment" }
};

const WEBCAM = ({showModal, setModal, locationId, fetchLocation}) => {
const uploadImage = base64 => {
 Api.send({
  type: "put",
  to: `/location/image/${locationId}`,
  useAlert: true,
  payload: {base64}
 }).then(res=>{
   if(res.success) {
    fetchLocation()
    setModal(false)
   }
 }).catch(console.error);
}

const [url, setUrl] = React.useState('')
const [loading, setLoading] = React.useState(false);

const handleCapture = async ({getScreenshot}) => {
  const imageSrc = getScreenshot().split("data:image/jpeg;base64,")[1]
  console.log(imageSrc);
  setUrl(getScreenshot())
  setLoading(true)
  await uploadImage(imageSrc)
}
 return (
  <ModalOne {...{width: "100%", height: "70vh", showModal, setModal}}>
   <h2 className='mb-5 text-2xl'>Capture A Location</h2>
  <Webcam
    audio={false}
    height={5020}
    screenshotFormat="image/jpeg"
    width={1280}
    mirrored={false}
    videoConstraints={videoConstraints}
    onUserMedia={e => console.log(e)}
   />
    {/* {({ getScreenshot }) => ( */}
      <Button
      {...{
       value: loading ? "Capturing..." : "Capture Photo",
       disabled: loading,
       width: "200px",
       wrapperClass: "my-5",
        onClick: handleCapture
      }}
      />
    {/* )} */}
  {/* </Webcam> */}
 
  </ModalOne>
 );
}
export default WEBCAM;
