import React, { useRef, useState } from "react";
import styled from "styled-components";
import { MdKeyboardArrowDown } from "react-icons/md";
import Input from "../Input/InputOne";
import { useEffect } from "react";

const Dropdown = styled.div`
		display: none;
		top: calc(100% + 5px);
		background: #e9edff;
		z-index: 1;
		left: 0;
		& li {
			border-bottom: 1px solid #aaa;
			transition: all 0.3s ease-in-out;
		}
		& li:hover {
			background: var(--C_white);
			color: var(--C_black);
			transition: all 0.3s ease-in-out;
		}
	`,
	Container = styled.div``,
	Search = styled.input`
		border-radius: 0px;
	`;

const SelectTwo = ({
	value,
	name,
	placeholder,
	label,
	options,
	onChange,
	required,
	disabled,
	inputClass,
	wrapperClass,
	labelClass,
	handleSearch,
	useSearch = true,
	error,
}) => {
	const searchInput = useRef(null);
	const [option, setOption] = useState([])

	useEffect(()=> setOption(options), [options])
	
	const searchControl = (value) => {
		let data;
		if(value) {
			data =  options.filter(data=> {
				if(data.name) return data.name.toLowerCase().indexOf(value.toLowerCase()) > -1
				else return data.toLowerCase().indexOf(value) > -1
			})
		} else data = options

		setOption(data)
	}
	handleSearch = handleSearch || searchControl
	return (
		<div className="mt-3 __select" onClick={e=> {
			e.stopPropagation()
			if(e.currentTarget.querySelector('.__dropdown').style.display === 'block') e.currentTarget.querySelector('.__dropdown').style.display='none'
			else e.currentTarget.querySelector('.__dropdown').style.display='block'
		}}>
			<Input
				value={value}
				name={name}
				label={label}
				placeholder={placeholder}
				labelClass={labelClass}
				disabled={disabled}
				wrapperClass={`input__two ${wrapperClass}`}
				inputClass={`relative ${inputClass}`}
				inputC={disabled ? "" : "cursor-pointer"}
				icon={<MdKeyboardArrowDown className="bold" size={"20"} />}
				required={required}
				error={error}
				onChange={(e) => {}}
				onClick={({ target }) => {
					target.blur();
					document.querySelectorAll(".__select .__dropdown")?.forEach(_=> {
						if(_.id !== name+'__select') _.style.display="none"})
					setOption(options)
					if(!value) {
						error.setTouched({...error.touched,	[name]: true });
						error.setErrors({
							...error.errors,
							[name]: `&nbsp;${label} is required`,
						})
					}
					setTimeout((_) => {
						searchInput?.current?.focus();
					}, 500)
				}}>
				<div>
					{/* {show && ( */}
						<Dropdown id={name+'__select'} className="h-[180px] absolute mb-5 w-full shadow-lg rounded __dropdown">
							<div className={`${useSearch ? "h-[140px]" : "h-[180px]"} pb-2`}>
								{useSearch && (
									<Search
									onClick={e=> e.stopPropagation()}
										onChange={({ target }) => handleSearch(target.value)}
										ref={searchInput}
										className="rounded-none capitalize w-full px-3 py-2 italic shadow focus:outline-none"
										placeholder="Search here..."
									/>
								)}
								<Container className="scroll h-full overflow-auto pt-3">
									{option.map((option, i) => {
										value = option;

										if(isNaN(Object.keys(value)[0])) {
											value = value.name
										}
										
										return (
											<li
												key={i}
												onClick={(e) => {
													e.stopPropagation()
													onChange(value, option);
													document.querySelectorAll('.__dropdown').forEach(_=> _.style.display='none')
													setOption(options)
												}}
												className="mb- list-none capitalize py-2 px-4 cursor-pointer">
												{value}
											</li>
										);
									})}
								</Container>
							</div>
						</Dropdown>
					{/* )} */}
				</div>
			</Input>
		</div>
	);
};

export default SelectTwo;
