import React from 'react';
import Webcam from "react-webcam";
import ModalOne from '../layout/Modal';
import Button from './Button';
import BACKEND from "../utils/backend";
import { TbCameraRotate } from 'react-icons/tb'

const Api = new BACKEND();



const WEBCAM = ({showModal, setModal, locationId, fetchLocation}) => {
const uploadImage = (base64, cb) => {
 Api.send({
  type: "put",
  to: `/location/image/${locationId}`,
  useAlert: true,
  payload: {base64}
 }).then(res=>{
  cb?.()
   if(res.success) {
    fetchLocation()
    setModal(false)
   }
   return res
 }).catch(console.error);
}

const [url, setUrl] = React.useState('')
const [camData, setCamData] = React.useState('')
const [loading, setLoading] = React.useState(false);
const [view, toggleView] = React.useState(true);

const videoConstraints = {
  width: '100%',
  height: "100%",
  facingMode: view ? { exact: "environment" } : "user"
 };

const handleCapture = async (getScreenshot) => {
  const imageSrc = getScreenshot().split("data:image/jpeg;base64,")[1]
  
  setUrl(getScreenshot())
  setLoading(true)
  await uploadImage(imageSrc, _=> setLoading(false))
}
 return (
  <ModalOne {...{width: window.innerWidth > 992 ? "80%" : "90%", height: "70vh", showModal, setModal}}>
   <div className="mb-5 flex justify-center relative items-center">
   <h2 className='text-2xl mr-10'>Capture A Location</h2>

  <TbCameraRotate className='cursor-pointer' size='24' onClick={_=> toggleView(state => !state)}/>
   </div>
  <Webcam
    audio={false}
    height={"100%"}
    screenshotFormat="image/jpeg"
    width={"100%"}
    style={{height: "80%"}}
    mirrored={true}
    videoConstraints={videoConstraints}
    forceScreenshotSourceSize={true}
    onUserMedia={e => setCamData(e)}
   >
    {({ getScreenshot }) => (
      <>
        {camData ?<div className='flex justify-center'>
     <Button
      {...{
       value: loading ? "Capturing..." : "Capture Photo",
       disabled: loading,
       width: "200px",
       wrapperClass: "my-5",
        onClick: _=> handleCapture(getScreenshot)
      }}
      /> 
       
      {/* <p></p> */}
      </div> : <p className='absolute top-[40%] text-center left-[35%] flex'>Click the <TbCameraRotate className='mx-1' size='24' />  icon or grant site permission to use your camera</p>}
      </>
    )}
    </Webcam> 
 
  </ModalOne>
 );
}
export default WEBCAM;
