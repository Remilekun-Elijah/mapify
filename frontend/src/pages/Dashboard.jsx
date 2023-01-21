/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import WEBCAM from "../components/Camera";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Map from "../components/Map";
import Select from "../components/Select/Select";
import { capitalize, format, lgas } from "../utils/helper";
import Alert from "../utils/alert";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import Location from "../action/location";

const SearchBoxDiv = styled.div`
		border: 1px solid #a5adba;
	`,
	SearchBox = styled.input`
		color: #030d25;
	`;
const options = ["LGA", ...lgas];

const Dashboard = () => {
	const [mapData, setMapData] = React.useState([]);
	const [locationId, setLocationId] = React.useState("");
	const [showModal, setModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const center = {
		lat: 6.458985,
		lng: 3.601521,
	};

	const [pagination, setPagination] = React.useState({
		lga: "",
		search: "",
	});

	let fetchLocation = (_) => {
		setIsLoading(true)
		Location.getAll(pagination)
			.then((res) => {
				setIsLoading(false)
				if (res.success) {
					setMapData(res?.data?.locations);
				} else {
					Alert({type: "error", message: res.message})
				}
			})
			.catch(console.error);
	};

	const onChange = ({ target: { value, name} }) => {
		const lga = name === 'lga' ? value : "",
		search = name === 'search' ? value : "";
		setPagination(state=> ({lga, search}));
	}

	React.useEffect(() => {
		fetchLocation();
	}, [pagination.lga, pagination.search]);

	return (
		<div className="h-screen overflowX-hidden">
			<Header />

			<div className="mt-6 px-[10%] flex flex-col">
			<div className="flex  justify-center md:justify-between flex-row flex-wrap md:order-1 mt-10">
				<h1 className="text-center text-lg  ms:text-2xl ">
					<b>{format(mapData.length)}</b> available {mapData.length > 1 ? 'locations' : 'location'} {mapData.length > 1 ? "are" : 'is'} marked with <b>{mapData.length > 1 ? "GPS Markers" : "GPS Marker"}</b>{" "}
				</h1>
				<div className="mt-5 md:mt-0">
					<button
						className="px-5 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white"
						onClick={(_) => navigate("/add-new-location")}>
						Add New
					</button>
					<button
						className="px-3 ml-1 md:ml-2 py-1 bg-slate-900 hover:bg-slate-700 rounded text-white"
						onClick={(_) => navigate("/locations")}>
						View Locations
					</button>
				</div>
			</div>
			<div className="mt-10 flex items-start justify-between flex-wrap">
				<div className="flex">
					<p className="mr-2">Filter by</p>
					<Select
						{...{
							options: options.map((name) => ({
								name,
								value: name === "LGA" ? "" : capitalize(name),
							})),
							value: pagination.lga,
							selectClass: "bg-[#eee] shadow-md py-1",
							name: "lga",
							onChange,
						}}
					/>
				</div>
				<SearchBoxDiv className="md:w-[35%] w-full py-1 mt-1 px-5 bg-white shadow  rounded-lg flex justify-between items-center">
					<label htmlFor="search" className="cursor-pointer">
						<FiSearch size={"24px"} className="mr-2" />
					</label>
					<SearchBox
						onChange={onChange}
						id="search"
						name='search'
						value={pagination.search}
						className="w-full h-full focus:outline-none placeholder:text-ellipse"
						placeholder="Search by description or address..."
					/>
				</SearchBoxDiv>
			</div>
			</div>

			<div className="flex justify-center">
				<Map {...{ center, mapData, setModal, setLocationId, isLoading }} />
			</div>

			<WEBCAM {...{ showModal, setModal, locationId, fetchLocation }} />
			<Footer />
		</div>
	);
};

export default Dashboard;
