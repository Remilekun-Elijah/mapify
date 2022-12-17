import React, { useState } from "react";
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import "./InputOne.css";
const Input = ({
	id,
	label,
	icon,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	onFocus,
	onClick,
	type,
	inputClass = "",
	wrapperClass = "",
	disabled = false,
	maxLength,
	labelClass = "",
	required = false,
	minLength,
	min,
	max,
	
	data,
	inputC,
	children,
	error,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className={`custom-input mt-3 text-start ${wrapperClass}`}>
			<div className={`flex justify-between mt-y relative`}>
				{label && (
					<label
						className={`block z-0 text-sm font-bold mb-2 input-label ${labelClass}`}
						htmlFor={id || name}>
						{label}{" "}
						{!disabled && required && (
							<span
								style={{ top: "2px", color: "red" }}
								className="relative">
								*
							</span>
						)}
					</label>
				)}
			</div>

			<div className={`flex items-center input_wrapper mb-1 p-0 ${inputClass}`}>
				<input
					className={`w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${inputC}`}
					type={(type || "text") && showPassword ? "text" : type}
					name={name}
					min={min}
					max={max}
					onClick={onClick}
					value={value}
					onBlur={onBlur}
					onFocus={onFocus}
					id={id || name}
					placeholder={placeholder}
					onChange={onChange}
					disabled={disabled}
					minLength={type === "tel" ? minLength || 10 : minLength}
					maxLength={type === "tel" ? maxLength || 15 : maxLength}
					required={error?false:required}
				/>
				{icon ? (
					icon
				) : type === "password" ? (
					showPassword ? (
						<IoMdEye
							onClick={(e) => setShowPassword(!showPassword)}
							className="icon pr-2"
							size="2em"
						/>
					) : (
						<IoMdEyeOff
							onClick={(e) => setShowPassword(!showPassword)}
							className="icon pr-2"
							size="2em"
						/>
					)
				) : null}

				{children}
			</div>
			
		</div>
	);
};
export default Input;
