import React from 'react';
import Webcam from "react-webcam";
import ModalOne from '../layout/Modal';
import Button from './Button';
import BACKEND from "../utils/backend";

const Api = new BACKEND();

const videoConstraints = {
 width: 1280,
 height: 3020,
 facingMode: "user"
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

 return (
  <ModalOne {...{width: "100%", height: "70vh", showModal, setModal}}>
   <h2 className='mb-5 text-2xl'>Capture A Location</h2>
  <Webcam
    audio={false}
    height={1020}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <Button
      {...{
       value: "Capture Photo",
       width: "200px",
       wrapperClass: "my-5",
        onClick: async () => {
          const imageSrc = getScreenshot().split("data:image/jpeg;base64,")[1]
          console.log(imageSrc);
          await uploadImage(imageSrc)
        }
      
      }}
      />
    )}
  </Webcam>
 
  </ModalOne>
 );
}
export default WEBCAM;
