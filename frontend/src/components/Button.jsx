import React from "react";
import styled, { ThemeProvider } from "styled-components";

const theme = {
	primary: {
		backgroundColor: "var(--C_primary)",
		color: "var(--C_white)",
		border: "none",
		hover: {
			backgroundColor: "var(--C_primary_hover)",
			color: "var(--C_white)",
		},
		disabled: {
			backgroundColor: "var(--C_primary_disabled)",
			color: "var(--C_white)",
		},
	},
	dark:{
		backgroundColor: "var(--C_black)",
		color: "var(--C_white)",
		border: "none",
		hover: {
			backgroundColor: "var(--C_black_lite)",
			color: "var(--C_white)",
		},
		disabled: {
			backgroundColor: "var(--C_black_lite)",
			color: "var(--C_white)",
			border: 'none'
		},
	
},
	danger:{
			backgroundColor: "var(--C_border_danger)",
			color: "var(--C_white)",
			border: "none",
			hover: {
				backgroundColor: "var(--C_danger)",
				color: "var(--C_white)",
			},
			disabled: {
				backgroundColor: "var(--C_danger)",
				color: "var(--C_white)",
				border: 'none'
			},
	},
	secondary: {
		backgroundColor: "var(--C_white)",
		border: "1px solid var(--C_primary)",
		color: "var(--C_primary)",
		hover: {
			backgroundColor: "var(--C_primary)",
			color: "var(--C_white) !important",
		},
		disabled: {
			backgroundColor: "var(--C_black_lite)",
			color: "var(--C_white)",
			border: 'none'
		},
	},
};

const SButton = styled.button`
		color: ${({ theme }) => theme.color};
		transition: all 0.3s ease-in-out;
		&:disabled {
			background-color: ${({ theme }) => theme.disabled.backgroundColor};
			color: ${({ theme }) => theme.disabled.color};
			border: ${({ theme }) => theme.disabled.border}
		}
		&:hover {
			color: ${({ theme }) => theme.hover.color};
			transition: all 0.3s ease-in-out;
			&:focus {
				outline: none;
			}
			&:disabled {
				background-color: ${({ theme }) => theme.disabled.backgroundColor};
				color: ${({ theme }) => theme.disabled.color};
				border: ${({ theme }) => theme.disabled.border};
			}
	`,
	Wrapper = styled.div`
		background-color: ${({ theme }) => theme.backgroundColor};
		color: ${({ theme }) => theme.color};
		border: ${({ theme }) => theme.border};
		transition: all 0.3s ease-in-out;
		&:hover {
			background-color: ${({ theme }) => theme.hover.backgroundColor};
			color: ${({ theme }) => theme.hover.color};
			transition: all 0.3s ease-in-out;
		}
	`;

const Button = ({
	id,
	icon,
	value,
	onClick,
	type,
	btnClass,
	wrapperClass,
	disabled,
	color,
	variant,
	width,
	parentClass,
}) => {
	return (
		<ThemeProvider theme={theme[variant || "primary"]}>
			<div className={`${parentClass||''} custom-button`}>
				<Wrapper
					className={`flex items-center cursor-pointer rounded-md btn_wrapper p-0 ${wrapperClass}`}
					style={{ color, width }}
					disabled={disabled}
					onClick={onClick}>
					{icon && icon}
					<SButton
						className={`w-full py-3 -10 rounded-md leading-tight focus:outline-none focus:shadow-outline text-white ${btnClass}`}
						type={type || "button"}
						id={id}
						disabled={disabled}
						style={{ color }}>
						{value}
					</SButton>
				</Wrapper>
			</div>
		</ThemeProvider>
	);
};
export default Button;