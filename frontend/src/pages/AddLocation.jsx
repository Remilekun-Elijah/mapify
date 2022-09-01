import React from "react";
import { FiUploadCloud } from "react-icons/fi";
import { Cloudinary } from "../utils/helper";
import Input from "../components/InputOne";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import IArrowBack from "../assets/images/arrow-back.svg";
import Alert from "../utils/alert";
import BACKEND from "../utils/backend";

const Button = styled.button``;
const Api = new BACKEND();

export default function AddLocation() {
	const values = {
		address: "",
		latitude: 0,
		longitude: 0,
		image: "",
	};
	const navigate = useNavigate();
	const [formData, setFormData] = React.useState(values),
		[isSubmitting, setSubmit] = React.useState(false);

	const addData = ({ target }) => {
		const name = target.getAttribute("name");
		if (name in values) {
			setFormData((state) => ({ ...state, [name]: target.value }));
		} else alert(name + " not in form data");
	};

	const handleSubmit = async (e) => {
			e.preventDefault();
			setSubmit(true);
			try {
				const res = await Api.send({
					type: "post",
					to: "/location",
					payload: formData,
				});

				console.log(res);

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
		},
		handleImageUpload = (data) => {
			setFormData((state) => ({ ...state, image: data.url }));
		};

	return (
		<div className="w-full h-screen ">
			<Header />

			<div className=" flex justify-center px-[10%] mt-20">
				<form
					className="modal__one rounded-2xl  md:w-[600px] w-80% border-0  mb-10"
					onSubmit={handleSubmit}>
					<div className="mt-5">
						<div className="my- flex items-center mb-10 ">
							<img
								src={IArrowBack}
								alt="arrow back"
								className="cursor-pointer mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
								onClick={(_) => navigate("/dashboard")}
							/>{" "}
							<strong className="text-2xl">Add New Location</strong>
						</div>

						<div>
							<div
								className="h-64 w-full flex mt-20 justify-center items-center rounded"
								style={{
									background: formData.image ? "" : "rgba(0,0,0, .3) center ",
								}}>
								<div
									className="cursor-pointer"
									onClick={() => new Cloudinary().upload(handleImageUpload)}>
									{formData.image ? (
										<img alt="" src={formData.image} className="h-64 w-full" />
									) : (
										<div className="relative w-40 h-[7em]  text-base  text-feint rounded flex-col items-center	justify-center">
											<div className="flex items-center justify-center mt-5">
												<FiUploadCloud size={40} className="text-slate-500" />
											</div>
											<p className="underline underline-offset-4 text-center text-slate-500">
												Select Image
											</p>
										</div>
									)}
								</div>
							</div>
							<h1 className="mb-10  pt-5  text-center text-md">
								Location Image
							</h1>

							<Input
								value={formData.address}
								name={"address"}
								wrapperClass={"mt-5 input__two"}
								label={"Address"}
								placeholder={" "}
								maxLength={20}
								minLength={3}
								labelClass={" "}
								inputClass={"shadow"}
								onChange={addData}
								required={true}
							/>

							<Input
								value={formData.latitude}
								name={"latitude"}
								label={"Latitude"}
								minLength={2}
								type={"number"}
								placeholder={" "}
								labelClass={" "}
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
						</div>

						<div className="flex mx-auto justify-center  my-10 w-full">
							<Button
								className="bg-slate-900 text-white shadow rounded-md w-full h-[40px]"
								type={"submit"}
								disabled={isSubmitting}>
								{" "}
								{isSubmitting ? "Sending..." : "Add Location"}{" "}
							</Button>
						</div>
					</div>
				</form>
			</div>

			<footer className="text-center py-2 mt-[-50px]">
				&copy; Copyright 2022. Some rights reserved.
			</footer>
		</div>
	);
}
