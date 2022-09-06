import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Map from "../components/Map";
import BACKEND from "../utils/backend";

const Api = new BACKEND();
const Dashboard = () => {
const [mapData, setMapData] = React.useState([])
 const navigate = useNavigate()
	const center = {
		lat:  6.458985,
		lng: 3.601521,
		};

		React.useEffect(()=>{
			 Api.send({
				type: "get",
				to: "/location",
				useAlert: false
			}).then(res=>{
					setMapData(res?.data?.locations.map(d=>({lat: d.latitude, lng: d.longitude, addr: d.description, img: d.image})))
			}).catch(console.error);
		}, [])
	
	
	return (
		<div className="h-screen overflowX-hidden">
			<Header />
			<div className="flex flex-col relative justify-center md:flex-row mt-20 px-[10%]">
				<h1 className="text-center text-lg  ms:text-2xl ">
					Available locations are marked with <b>GPS Marker(s)</b>{" "}
				</h1>
				<div className=" md:absolute mt-5 md:mt-0 md:right-[10%]">
					<button className="px-5 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white" onClick={_=> navigate('/add-new-location')}>Add New</button>
					<button className="px-3 ml-2 py-1 bg-slate-900 hover:bg-slate-700 rounded text-white" onClick={_=> navigate('/locations')}>View Locations</button>
				</div>
			</div>
			<div className="flex justify-center items">
				<Map {...{ center, mapData }} />
			</div>

			<footer className="text-center py-2 mt-5">
				&copy; Copyright 2022. Some rights reserved.
			</footer>
		</div>
	);
};

export default Dashboard;
