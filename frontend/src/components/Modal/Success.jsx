import React from "react";
import Modal from "../../layout/Modal";
import "./ModalOne.css";
import Button from "../Button";
import { ISuccess } from "../../utils/icons";

export default function Success({ setModal, success, title, subtitle }) {
	return (
		<Modal
			{...{
				setModal,
				showModal: success,
				width: "600px",
				height: "400px",
			}}>
			<div className="mx-10 flex justify-center items-center">
				<div>
					<div className="my-5 flex justify-center items-center">
						<img src={ISuccess} alt="" />
					</div>

					<p className="leading-5 text-center text-xl">{title}</p>
					{subtitle && <p className="text-gray-600 mt-7 text-sm">{subtitle}</p>}

					<div className="flex justify-center text-center">
						<Button
							wrapperClass={"mt-10 w-full mb-5 px-2 mr-5"}
							value={"Close"}
							parentClass={"w-full"}
							variant={"dark"}
							onClick={(_) => setModal(false)}
						/>
					</div>
				</div>
			</div>
		</Modal>
	);
}
