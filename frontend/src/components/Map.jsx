import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Link } from "react-router-dom";
import Loader from "./Loader/Loader";
import './Map.css'

const Map = ({ center, mapData, setModal, setLocationId, isLoading }) => {
	return (
    <div className="relative flex justify-center w-full">
		<MapContainer
			className="z-0 border border-gray-700 map relative"
			center={center}
			zoom={11}
			scrollWheelZoom={false}>
			<TileLayer
				attribution='&copy; <a href="https://wredww.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{mapData.map((data, key) => {
        const { description, image, longitude, latitude } = data;
        
				return (
          <Marker {...{ key, position: { lat: latitude, lng: longitude } }}>
						<Popup>
							{
                <div className="flex flex-col">
									<span>{description}</span>
									<div className="flex justify-between">
										{image ? (
											<a
                      target="_blank"
                      rel="noreferrer"
                      className="text-end"
                      href={image}>
												Open image{" "}
											</a>
										) : (
                      <span
                      className="text-end text-blue-700 cursor-pointer"
                      onClick={(_) => {
                        setLocationId(data._id);
                        setModal(true);
                      }}>
												Upload Image
											</span>
										)}

										<Link
											className="text-end ml-3"
											to={`/locations/${data._id}`}
											state={data}>
											View Details{" "}
										</Link>
									</div>
								</div>
							}
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
			{isLoading && <div
				className="overlays flex justify-center items-center mx-auto scroll p-2 px-[20%]"
				style={{ overflowY: "auto" }}>
          <div className="flex mb-20 items-center"  style={{zIndex: 1000}}>
				<div className="flex justify-center h-full   mx-auto w-full" style={{zIndex: 1000}}><Loader className='before:bg-white'/></div>
          </div>
			</div>}
    </div>
	);
};

export default Map;
