/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WEBCAM from "../components/Camera";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import Select from "../components/Select/Select";
import { capitalize, lgas } from "../utils/helper";
import BACKEND from "../utils/backend";
import Alert from "../utils/alert";

const options = ["LGA", ...lgas];
const Api = new BACKEND();

const Dashboard = () => {
const [mapData, setMapData] = React.useState([])
const [lga, setLga] = React.useState("")
const [locationId, setLocationId] = React.useState("")
const [showModal, setModal] = useState(false) 
 const navigate = useNavigate()
	const center = {
		lat:  6.458985,
		lng: 3.601521,
		};

let fetchLocation = _=> {
	if(lga) Alert({message: "Applying filter...", type: "info"})
	Api.send({
	type: "get",
	to: `/location/?lga=${lga}`,
	useAlert: false
}).then(res=>{
		if(res.success) {
			setMapData(res?.data?.locations)
			if(lga) Alert({message: "Filter applied successfully", type: "success"})
		}
}).catch(console.error);
}

		React.useEffect(()=>{
			 fetchLocation()
		}, [lga])
	
	return (
		<div className="h-screen overflowX-hidden">
			<Header />
			<div className="flex  justify-center md:justify-between flex-row mt-20 px-[10%] flex-wrap">
				<div className="flex items-cente">
					<p className="mr-2">Filter by</p>
					<Select {...{
						options: options.map((name) => ({
							name,
							value: name === 'LGA' ? "" : capitalize(name) })),
						value: lga,
						selectClass: "bg-[#eee] shadow-md py-1",
						name: "lga",
						onChange: ({target: {value}})=> setLga(value)
					}}
					/>
				</div>
				<h1 className="text-center text-lg  ms:text-2xl ">
					Available locations are marked with <b>GPS Marker(s)</b>{" "}
				</h1>
				<div className="mt-5 md:mt-0">
					<button className="px-5 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white" onClick={_=> navigate('/add-new-location')}>Add New</button>
					<button className="px-3 ml-1 md:ml-2 py-1 bg-slate-900 hover:bg-slate-700 rounded text-white" onClick={_=> navigate('/locations')}>View Locations</button>
				</div>
			</div>
			<div className="flex justify-center items">
				<Map {...{ center, mapData, setModal, setLocationId }} />
			</div>

			<WEBCAM {...{ showModal, setModal, locationId, fetchLocation}}/>
			<Footer />
		</div>
	);
};

export default Dashboard;
