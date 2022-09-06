import React, { useEffect, useRef } from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { GrCheckbox } from "react-icons/gr";
import Pagination from "./Pagination";
import Loader from "../Loader/Loader";
import "./Table.css";
import { useNavigate } from "react-router-dom";

export default function Table({
	data,
	action = { text: "", action: () => {} },
	pagination,
	setPagination,
	isLoading = false,
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
					onClick={(_) =>
						checkbox.action(checkedList, () => {
							check.toggleCheck();
							setCheckedList([]);
						})
					}
					style={{
						background: "var(--C_bg_danger",
						color: "var(--C_danger)",
					}}
					className="flex items-center cursor-pointer mr-5 px-2 py-1 rounded">
					<RiDeleteBinFill
						color={"var(--C_danger)"}
						className="shadow-sm mr-2"
					/>
					<span> {checkbox.text} </span>
				</div>
				<div
					style={{ background: "var(--C_primary_disabled)" }}
					className="flex items-center cursor-pointer rounded px-2 py-1"
					onClick={(_) => {
						check.toggleCheck();
						setCheckedList((_) => []);
					}}>
					<GrCheckbox color="white" className="shadow-sm mr-2" />
					<span className="ml-auto text-white">Unselect All</span>
				</div>
			</div>
					<div className="overflow-x-auto">
			<table className="border-collapse w-full table-auto">
				<thead className="border-spacing-y-20">
					<tr className="">
						<th className="relative">
							<input
								className={`cursor-pointer absolute left-3 top-5 ${
									isLoading || !pagination.total ? "invisible" : "visible"
								}`}
								type="checkbox"
								ref={allInputChecker}
								onChange={check.handleCheck}
							/>
						</th>
						{keys.map((name, i) => {
							return (
								!name.startsWith("_") && (
									<th key={i}>
										{name}
									</th>
								)
							);
						})}
						{action.text && <th className={`text-end relative left-[-10px] ${
									isLoading || !pagination.total ? "invisible" : "visible"
								}`}>Action</th>}
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
												className="ml-2 mr-3 sm:mr-0 cursor-pointer"
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
														className="td truncate text-center capitalize">
														{typeof value == "string" &&
														value.startsWith("https") ? (
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

										<td className="td text-end">
											{" "}
											<span
												className="rounded px-2 py-1 cursor-pointer"
												style={{
													backgroundColor: "var(--C_bg_danger)",
													color: "var(--C_danger)",
												}}
												onClick={(_) => action.action(res._id)}>
												{action.text}
											</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					) : (
						""
					))}
			</table>
			</div>
			{isLoading && (
				<div className="flex my-5 items-center justify-center w-full">
					<Loader />
				</div>
			)}
			{!isLoading && !pagination.total && (
				<div className="flex my-5 items-center justify-center w-full">
					<h3 className="text-center">No record found</h3>
				</div>
			)}
			{pagination.total ? (
				<div className={`w-full my-10 ${isLoading ? "visible" : "visible"}`}>
					<div className="flex flex-col sm:flex-row justify-between items-center">
						<p className="text-sm mb-5 ms:mb-0" style={{ color: "var(--C_blue_light)" }}>
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
								page: pagination.page - 1,
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
	);
}
