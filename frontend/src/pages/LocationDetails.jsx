import React from "react";
import { MdLocationOn, MdOutlineLocationCity } from "react-icons/md";
import { FaUserAlt, FaMobile } from "react-icons/fa";
import { RiChatPollFill, RiGovernmentFill } from "react-icons/ri";

import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { IArrowBack } from "../utils/icons";

export default function LocationDetails() {
	const navigate = useNavigate();
	const { state } = useLocation();
	return (
		<div className="">
			<Header />

			<div className="px-[10%]">
				<div className="mt-20 flex items-center mb-10 ">
					<img
						src={IArrowBack}
						alt="arrow back"
						className="cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
						onClick={(_) => navigate(-1)}
					/>{" "}
					<strong className="text-lg sm:text-2xl">Location Details</strong>
				</div>
				<div>
					{state.image &&
      <div className="flex flex-col justify-center">
     <img
						src={state.image}
      style={{maxHeight: "400px"}}
						alt=""
					/>
     <div className="text-center text-lg mt-2">Location Image</div>
     </div>
     }

					<div className="mt-8">
						<table>
							<thead>
								<tr className="invisible">
									<th> Row</th> <th> Row</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="flex mr-5">
										<MdOutlineLocationCity title="Address" size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Address</p>
									</td>
									<td>{state.address}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<RiGovernmentFill size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">LGA</p>
									</td>
									<td>{state.lga}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<MdLocationOn size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Coordinates</p>
									</td>
									<td>
										{state.latitude}, {state.longitude}
									</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<RiChatPollFill size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Polling Unit No.</p>
									</td>

									<td>{state.pollingUnit}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<FaUserAlt size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600"> Agent Party Name</p>
									</td>
									<td>{state.agentParty}</td>
								</tr>

								<tr className="invisible">
									<td>place</td>
								</tr>

								<tr className="mt-20 pt-20">
									<td className="flex mr-5">
										<FaMobile size="24" color="green" />{" "}
										<p className="ml-2 text-gray-600">Agent Tel. Number</p>
									</td>
									<td>{state.phoneNumber}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
