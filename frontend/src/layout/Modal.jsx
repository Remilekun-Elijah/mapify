import React, { useEffect } from "react";
import "./Modal.css";

export default function ModalOne({
	width,
	height,
	children,
	showModal,
	setModal,
	className
}) {
	useEffect(() => {
			document.body.style.overflowY = showModal ? "hidden" : "scroll";
	}, [showModal]);

	return (
		showModal && (
			<>
				<div
					className="overlay no-js-hide flex items-center justify-center z-50"
					onClick={(e) => {if(e.target.classList.contains('overlay')) setModal((_) => false)}}>
				<div
					className={`modal rounded-2xl py-1 px-2`}
					style={{
						width: width || "400px",
						height: height || "300px",
					}}>
					<div className={`modal__one scroll p-2  ${className}`} style={{	overflowY: "auto",}}>
						{children}
					</div>
				</div>
			</div>
			</>
		)
	);
}
