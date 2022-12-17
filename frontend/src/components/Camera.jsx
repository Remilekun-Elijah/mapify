import React from 'react';
import Webcam from "react-webcam";
import ModalOne from '../layout/Modal';
import Button from './Button';
import BACKEND from "../utils/backend";
import { TbCameraRotate } from 'react-icons/tb'

const Api = new BACKEND();



const WEBCAM = ({showModal, setModal, locationId, fetchLocation}) => {
const uploadImage = base64 => {
 Api.send({
  type: "put",
  to: `/location/image/${locationId}`,
  useAlert: true,
  payload: {base64}
 }).then(res=>{
  setUrl("")
  setLoading(false)
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
  width: 700,
  height: 720,
  facingMode: view ? { exact: "environment" } : "user"
 };

const handleCapture = async (getScreenshot) => {
  const imageSrc = getScreenshot().split("data:image/jpeg;base64,")[1]
  
  setUrl(getScreenshot())
  setLoading(true)
  await uploadImage(imageSrc)
}
 return (
  <ModalOne {...{width: window.innerWidth > 992 ? "80%" : "95%", height: "70vh", showModal, setModal}}>
   <div className="mb-5 flex justify-center items-center">
   <h2 className='text-2xl mr-10'>Capture A Location</h2>

  <TbCameraRotate className='cursor-pointer' size='24' onClick={_=> toggleView(state => !state)}/>
   </div>
   { !camData && <div className="flex justify-center flex-wrap"><p className='text-center flex mt-20'>Click <TbCameraRotate className='mx-1' size='24' /> or grant site permission to use your camera</p></div>}
  { !url ? 
  //  <div>
  <Webcam
    audio={false}
    width={videoConstraints.width}
    height={videoConstraints.height}
    screenshotFormat="image/jpeg"
    style={{height: "60%", width: "100vw", }}
    mirrored={false}
    videoConstraints={videoConstraints}
    forceScreenshotSourceSize={true}
    onUserMedia={e => setCamData(e)}
   >
    {({ getScreenshot }) => (
      <>
        {camData && <div className='flex justify-center'>
     <Button
      {...{
       value: loading ? "Capturing..." : "Capture Photo",
       disabled: loading,
       width: "200px",
       wrapperClass: "my-5",
        onClick: _=> handleCapture(getScreenshot)
      }}
      /> 
      </div> }
      </>
    )}
    </Webcam> 
    : <div className='flex justify-center'>
      <div className="">
      <img src={url} alt="" />
      <div className='flex justify-center'>
      <Button
      {...{
       value: loading ? "Capturing..." : "Capture Photo",
       disabled: loading,
       width: "200px",
       wrapperClass: "my-5"
      }}
      />
      </div>
      </div> 
      </div>
//  </div>
}
  </ModalOne>
 );
}
export default WEBCAM;
