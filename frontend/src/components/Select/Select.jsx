import React from "react";
import styled from "styled-components";
import './Select.css';

const Label = styled.label`
font-family: 'Inter';
 font-style: normal;
 font-weight: 500;
 font-size: 15px;
 line-height: 18px;
 border: none !important;
`;

export default function Select({
	label,
	name,
	onChange,
	options,
	value,
	onBlur,
	onFocus,
	required,
	disabled,
 selectClass,
	wrapperClass,
	labelClass,
	width,
	height,
	error
}) {
	return (
		<div
			className={`flex flex-col ${label ? "mt-3": ""} w-ful ${wrapperClass}`}
			style={{ width: width }}>
			{label && <Label
				htmlFor={name}
				className={`text-start ml- text-sm font-bold block text-dark my- ${labelClass}`}>
				{" "}
				{label} {!disabled && required && (
							<span
								style={{ top: "2px", color: "var(--C_danger)" }}
								className="relative">
								*
							</span>
						)}
			</Label>}
			<select
				style={{ height: height || "100%" }}
				name={name}
				value={value}
				onChange={onChange}
				onBlur={onBlur}
				onFocus={onFocus}
				required={required}
				disabled={disabled}
				id={name}
				className={`select_role text-gray-700 leading-tight block w-full py- px-3 my- ${selectClass?.includes("rounded") ?selectClass: "rounded-sm "+selectClass}  shadow rounded`}>
				{options?.map((option, index) => {
					return (
						<option className="text-gray-700" key={index} value={option.value||''} disabled={option?.disabled}>
							{(option?.name?.split('')[0]?.toUpperCase()||'') + (option?.name?.slice(1) ||'')}
						</option>
					);
				})}
			</select>
			<div className={`text-red-500 text-xs italic ${error?.touched[name] && error?.errors[name]?'visible':'invisible'}`}>
				{error?.touched[name] && error?.errors[name]
					? error?.errors[name]
					: "nil"}
			</div>
		</div>
	);
}
