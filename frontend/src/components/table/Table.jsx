import React, { useEffect, useRef } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrCheckbox } from "react-icons/gr";
import Pagination from "./Pagination";
import Loader from "../Loader/Loader";
import Dropdown from "../Dropdown";
import "./Table.css";

export default function Table({
	data,
	pagination,
	setPagination,
	isLoading = false,
	dropdownMenu,
	checkbox = { text: "Bulk Delete", action: () => {} },
}) {
	const [checkedList, setCheckedList] = React.useState([]),
		allInputChecker = useRef(false);

	const check = {
		all: (_) => {
			setCheckedList(data?.map((item) => item._id));
			check.checkAll();
		},
		checkAll: (_) => {
			checkedList.forEach((_id) => {
				if (document.getElementById(_id))
					document.getElementById(_id).checked = true;
				else setCheckedList([]);
			});
		},
		handleCheck: () => {
			const status = allInputChecker.current.checked;
			if (status) {
				check.all();
			} else {
				check.toggleCheck();
				setCheckedList([]);
			}
		},
		toggleCheck: (res) => {
			if (res) {
				const newCheckedList = [...checkedList];
				if (newCheckedList.includes(res._id)) {
					newCheckedList.splice(newCheckedList.indexOf(res._id), 1);
				} else {
					newCheckedList.push(res._id);
				}
				setCheckedList(newCheckedList);
			} else {
				checkedList.forEach((_id) => {
					document.getElementById(_id).checked = false;
				});
			}
		},
	};

	check.checkAll();
	useEffect(() => {
		if (checkedList.length === data.length) {
			allInputChecker.current.checked = true;
		} else {
			allInputChecker.current.checked = false;
		}
	}, [checkedList, data]);

	const keys = Object.keys(data?.[0]);
	return (
		 <div className="table-container">
			<div
				className="flex items-center mb-2"
				style={{
					visibility: `${checkedList.length > 1 ? "visible" : "hidden"}`,
				}}>
				<div
				onClick={_=>checkbox.action?.(checkedList, ()=>{
					check.toggleCheck();
				setCheckedList([]);
				})}
					style={{
						background:  "var(--C_bg_danger",
						color:  "var(--C_danger)",
					}}
					className="flex items-center cursor-pointer mr-5 px-2 py-1 rounded">
					<RiDeleteBinFill
						color={ "var(--C_danger)"}
						className="shadow-sm mr-2"
					/>
					<span> {checkbox.text } </span>
				</div>
				<div
				onClick={_=>{
					check.toggleCheck();
				setCheckedList([]);
				}}
					style={{
						background:  "#666",
						color:  "white",
					}}
					className="flex items-center cursor-pointer mr-5 px-2 py-1 rounded">
					<GrCheckbox color="white" className="shadow-sm mr-2" />
					<span className="ml-auto">Unselect All</span>
				</div>
			</div>
			<div className="lg:overflow-x-hidden overflow-x-auto">
			<table className="border-collapse w-full table-auto pb-10">
				<thead className="border-spacing-y-20">
					<tr className="left-10">
					<th className="relative">
							<input
							
								className={`cursor-pointer absolute left-3 top-5 ${ isLoading || !pagination.total ? 'invisible':'visible' }`}
								type="checkbox"
								ref={allInputChecker}
								onChange={check.handleCheck}
							/>
						</th>
							
						{keys.map((name, i) => {
							return (
								!name.startsWith("_") && (
									<th key={i} className={`text-left left-10 ml-10 pl-1`}>
										{name}
									</th>
								)
							);
						})}
						{ (!isLoading && dropdownMenu) && <th>Action</th>}
					</tr>
				</thead>

				{!isLoading &&
					(pagination.total ? (
						<tbody>
							{data.map((res, index) => {
								return (
									<tr className="p-20 mt-5" key={index}>
									<td className="td">
											<input
												className="ml-2 cursor-pointer"
												type="checkbox"
												id={res?._id}
												onChange={(_) => check.toggleCheck(res)}
											/>
										</td>

										{keys.map((name, i) => {
											const value = res[name];
											return (
												!name.startsWith("_") && (
													<td
														key={res._id + "_" + i}
														className="td truncate text-left capitalize">
														{typeof value == "string" &&
														(value.startsWith("https") || value.startsWith("http")) ? (
															<center><img
															className="cursor-pointer"
															onClick={_=>window.open(value, "_blank")}
																src={value}
																style={{
																	width: "50px",
																	height: "50px",
																	borderRadius: "45px",
																}}
																alt="location"
															/></center>
														) : (
															value
														)}
													</td>
												)
											);
										})}

										{dropdownMenu && (
											<td className="items-center flex justify-center">
												<Dropdown {...{ menu: dropdownMenu, rowProp: res }} />
											</td>
										)}
									</tr>
								);
							})}
						</tbody>
					) : (
						""
					))}
			</table>
			
			{isLoading && (
				<div className="flex my-5 items-center justify-center w-full">
					<Loader className={'before:bg-[#333]'}/>
				</div>
			)}
			{!isLoading && !pagination.total && (
				<div className="flex my-5 items-center justify-center w-full h-full">
					<h3 className="text-center">No record found</h3>
				</div>
			)}
			
			{pagination.total ? (
				<div className={`w-full my-10 ${isLoading ? "visible" : "visible"}`}>
					<div className="flex sm:justify-between justify-center items-center flex-wrap">
						<p className="text-sm" style={{ color: "var(--C_blue_light)" }}>
							Showing{" "}
							<span>
								{Math.min(pagination.length, pagination.total) ||
									pagination.pageSize}
							</span>{" "}
							{pagination.total > 1 ? "results" : "result"} of{" "}
							<span>{pagination.total}</span>{" "}
							{pagination.total > 1 ? "records" : "record"}
						</p>

						<Pagination
							{...{
								page: pagination.page-1,
								itemsPerPage: pagination.pageSize,
								setPagination,
								total: pagination.total,
							}}
						/>
					</div>
				</div>
				
			) : (
				""
			)}
				</div>
		</div>
	);
}
