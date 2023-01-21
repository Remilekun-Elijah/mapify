import React from "react";
import { capitalize, lgas } from "../utils/helper";
import Input from "../components/Input/InputOne";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "../utils/alert";
import { IArrowBack } from "../utils/icons";
import SelectTwo from "../components/Select/SelectTwo";
import Footer from "../components/Footer";
import Location from "../action/location";


const Button = styled.button``;

export default function AddLocation() {
	
	const navigate = useNavigate(),
	[isSubmitting, setSubmit] = React.useState(false),
	{ state } = useLocation(),
	values = {
		description: "",
		latitude: 0,
		longitude: 0,
		image: "",
		address: "",
		pollingUnit: "",
		agentParty: "",
		phoneNumber: "",
		lga: "",
	},
	{__v, _id, createdAt, updatedAt, image, ...rest} = state || {},
	[formData, setFormData] = React.useState(state ? rest : values);
	
	const addData = ({ target: { name, value } }) => {
		setFormData((state) => ({ ...state, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubmit(true);
		try {
			const res = state ? await Location.edit(formData, _id) : await Location.add(formData)

			if (res?.success) {
				Alert({ type: "success", message: res?.message });
				navigate("/dashboard");
				setSubmit(false);
			} else {
				setSubmit(false);
			}
		} catch (err) {
			setSubmit(false);
			console.error(err);
		}
	};

	return (
		<div className="w-full h-screen">
			<Header />

			<div className=" flex justify-center px-[10%] mt-16">
				<form
					className="modal__one rounded-2xl  md:w-[600px] w-80% border-0  mb-10"
					onSubmit={handleSubmit}>
					<div className="mt-5">
						<div className="my- flex items-center mb-10 ">
							<img
								src={IArrowBack}
								alt="arrow back"
								className="cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
								onClick={(_) => navigate(-1)}
							/>{" "}
							<strong className="text-lg sm:text-2xl">{state ? "Edit Location" : "Add Location"}</strong>
						</div>

						<div>
							<Input
								value={formData.latitude}
								name={"latitude"}
								label={"Latitude"}
								minLength={2}
								type={"number"}
								placeholder={" "}
								wrapperClass={"input__two"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<Input
								value={formData.longitude}
								name={"longitude"}
								type={"number"}
								wrapperClass={"mt-5 input__two"}
								label={"Longitude"}
								placeholder={" "}
								labelClass={" "}
								minLength={2}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<SelectTwo
								{...{
									value: formData.lga,
									name: "lga",
									placeholder: "",
									label: "Local Government Area (LGA)",
									options: lgas.map((name) => ({
										name,
										value: capitalize(name),
									})),
									required: true,
									wrapperClass: "mt-5 input__two",
									onChange: (_, { value }) =>
										setFormData((state) => ({ ...state, lga: value })),
								}}
							/>

							<Input
								value={formData.address}
								name={"address"}
								label={"Address"}
								minLength={2}
								type={"text"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two z-0"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<Input
								value={formData.pollingUnit}
								name={"pollingUnit"}
								label={"Polling Unit No. (PU)"}
								minLength={1}
								type={"number"}
								labelClass={"z-0"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two z-0"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<Input
								value={formData.agentParty}
								name={"agentParty"}
								label={"Name of Agent Party"}
								minLength={1}
								type={"text"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<Input
								value={formData.phoneNumber}
								name={"phoneNumber"}
								label={"Agent Tel. Number"}
								minLength={1}
								type={"tel"}
								placeholder={" "}
								wrapperClass={"mt-5 input__two"}
								inputClass={"shadow"}
								required={true}
								onChange={addData}
							/>

							<div className="mt-5">
								<label
									htmlFor="description"
									className="block text-sm font-bold mb-2 input-label">
									Description{" "}
									<span
										style={{ top: "2px", color: "red" }}
										className="relative">
										*
									</span>
								</label>
								<textarea
									className="w-full py-3 px-3 text-gray-700 leading-tight shadow focus:outline-none focus:shadow-outline resize-none outline-none"
									rows={3}
									id="description"
									value={formData.description}
									name={"description"}
									label={"Description"}
									placeholder={" "}
									minLength={3}
									onChange={addData}
									required={true}
								/>
							</div>
						</div>

						<div className="flex mx-auto justify-center  my-10 w-full">
							<Button
								className="bg-slate-900 text-white shadow rounded-md w-full h-[40px]"
								type={"submit"}
								disabled={isSubmitting}>
								{" "}
								{isSubmitting ? "Sending..." : state ? "Update Location" : "Add Location"}{" "}
							</Button>
						</div>
					</div>
				</form>
			</div>

			<Footer />
		</div>
	);
}
