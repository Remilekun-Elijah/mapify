/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import Header from "../components/Header";
import Delete from "../components/Modal/Delete";
import Table from "../components/table/Table";
import Alert from "../utils/alert";
import BACKEND from "../utils/backend";
import Menu from "../utils/data.dropdown";
import { IArrowBack, IEmpty } from "../utils/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Location from "../action/location";

const Api = new BACKEND();

const ViewLocation = () => {
	const [modals, setModals] = React.useState({
		delete: false,
		isLoading: false,
		userId: [],
		name: "",
		type: "Location",
		cb: () => {},
		action: () => {},
	});

	const navigate = useNavigate();
	const [locations, setLocations] = React.useState([{}]);

	const deleteBulk = useCallback(
		(payload, cb) => {
			const deleteAction = (onSuccess, onError) =>
				Location.bulkDelete(payload)
					.then((res) => {
						if (res.success) {
							getLocations();
							if (onSuccess) {
								onSuccess();
								if (modals.cb) modals.cb();
							}
							setModals((state) => ({
								...state,
								userId: "",
								name: "",
								type: "Location",
							}));
						} else {
							Alert({
								type: "error",
								message: res.message,
							});
							if (onError) onError();
						}
					})
					.catch((err) => {
						onError();
						console.error(err);
					});

			setModals((state) => ({
				...state,
				type: "Locations",
				name: `the ${payload.length} selected locations`,
				userId: payload,
				delete: true,
				cb,
				action: deleteAction,
			}));
		},
		[],
	);

	const [pagination, setPagination] = React.useState({
		page: 1,
		pageSize: 10,
		total: 0,
		length: 0,
		search: "",
	});

	const getLocations = () => {
		Api.send({
			type: "get",
			to: `/location/?page=${pagination.page}&pageSize=${pagination.pageSize}`,
			useAlert: false,
		})
			.then((res) => {
				if (res?.success) {
					const { pageSize, total, locations } = res?.data;
					setLocations(
						locations?.map((data) => {
							const {
								description,
								longitude,
								latitude,
								image,
								address,
								pollingUnit,
								phoneNumber,
								createdAt,
								agentParty,
								updatedAt,
								lga,
								...rest
							} = data;
							return data
								? {
										image,
										Coordinates: `${latitude}, ${longitude}`,
										Address: address || "N/A",
										LGA: lga || "N/A",
										"PU No.": pollingUnit || "N/A",
										"Party Agent": agentParty || "N/A",
										"Party Agent No.": phoneNumber || "N/A",
										...rest,
										_data: data,
								  }
								: {};
						}),
					);
					// console.log(locations);
					setPagination((state) => ({
						...state,
						locations,
						total,
						pageSize,
						length: pagination.pageSize * pagination.page,
					}));
					setModals((state) => ({ ...state, isLoading: false }));
				}
			})
			.catch(console.error);
	};

	const menu = new Menu({
		action: Location,
		refresh: getLocations,
		type: "Location",
		setModal: setModals,
		setFormData: (val) =>
			setModals((state) => ({ ...state, disabledInfo: val })),
	});
	const dropdownMenu = [
		menu.viewLocation({ navigate }),
		menu.editLocation({ navigate }),
		menu.deleteLocation({
			actionName: "delete",
			cb: ({ name, action }) => {
				setModals((state) => ({ ...state, type: name, delete: true, action }));
			},
		}),
	];

	React.useEffect(() => {
		setModals((state) => ({ ...state, isLoading: true }));
		getLocations();
	}, [pagination.page]);

	return (
		<div>
			<Header />
			<div className="px-[10%]">
				<div className="flex  items-center justify-between flex-wrap  mt-16 mb-5 ">
					<div className="flex items-center">
						<img
							src={IArrowBack}
							alt="arrow back"
							className="cursor-pointer mr-2 sm:mr-5 hover:bg-slate-500 p-2 rounded-full"
							onClick={(_) => navigate(-1)}
						/>{" "}
						<strong className="text-md sm:text-2xl">View Locations</strong>
					</div>
					<button
						className="px-5 mt- sm:mt-0 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white"
						onClick={(_) => navigate("/add-new-location")}>
						Add New
					</button>
				</div>

				<div className="py-5">
				{locations.length ? (
					<Table
						{...{
							data: locations,
							isLoading: modals.isLoading,
							pagination,
							setPagination,
							dropdownMenu,
							checkbox: { text: "Bulk Delete", action: deleteBulk },
						}}
					/>
				) : (
					<div className="flex flex-col items-center mt-20">
						<img
							src={IEmpty}
							alt="Not found"
							style={{ width: "100px", height: "100px" }}
						/>
						<h1 className="text-xl mt-10">No location at the moment</h1>
					</div>
				)}
				</div>

				<Delete
					{...{
						type: modals.type,
						setModal: (val) =>
							setModals((state) => ({ ...state, delete: val })),
						showModal: modals.delete,
						action: modals.action,
						name: modals.name,
					}}
				/>
			</div>

			<Footer />
		</div>
	);
};

export default ViewLocation;
