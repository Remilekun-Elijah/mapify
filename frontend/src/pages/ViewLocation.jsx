import React from "react";
import Header from "../components/Header";
import Delete from "../components/Modal/Delete";
import Table from "../components/table/Table";
import Alert from "../utils/alert";
import BACKEND from "../utils/backend";
import dayjs from "dayjs";
import { IArrowBack, IEmpty } from "../utils/icons";
import { useNavigate } from "react-router-dom";



const Api = new BACKEND();

const ViewLocation = () => {
	const [modals, setModals] = React.useState({
		delete: false,
		isLoading: false,
  userId: "",
  name: "",
  type: "Location"
	});

 const navigate = useNavigate();
	const [locations, setLocations] = React.useState([{}]);

	const deleteAction = React.useCallback((onSuccess, onError) => {
  const isBulk = modals.name;
			Api.send({
				type: isBulk ? "patch": "delete",
				to: `/location${!isBulk ? "/" + modals.userId : ""}`,
				useAlert: false,
    payload: isBulk ? {locationIds: modals.userId} : {}
			})
				.then((res) => {
					if (res.success) {
						getLocations(pagination);
						if(onSuccess) {
       onSuccess();
       if(modals.cb) modals.cb()
      }
      setModals(state=>({...state, userId: "", name: "", type: "Location"}))
					} else {
						Alert({
							type: "error",
							message: res.message,
						});
						if(onError) onError();
					}
				})
				.catch((err) => {
					onError();
					console.error(err);
				});
	}, [modals.userId, modals.name]);

 const deleteBulk = (payload, cb) => {
   setModals(state => ({...state, type: "Locations", name: `the ${payload.length} selected locations`, userId: payload, delete: true, cb}))
 }

	const [pagination, setPagination] = React.useState({
		page: 1,
		pageSize: 10,
		total: 0,
		length: 0,
		search: "",
	});

	const getLocations = (pagination) => {
		Api.send({
			type: "get",
			to: `/location/?page=${pagination.page}&pageSize=${pagination.pageSize}`,
			useAlert: false,
		})
			.then((res) => {
				if (res.success) {
					const { pageSize, total, locations } = res?.data;
					setLocations(
						locations.map((data) => {
							const { description, image, createdAt, updatedAt, ...rest } = data;
							return data?{
								image,
								...rest,
        "created At": dayjs(createdAt).format("MMM DD, YYYY"),
							}:{};
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

	React.useEffect(() => {
		setModals((state) => ({ ...state, isLoading: true }));
		getLocations(pagination);
	}, [pagination.page]);

	return (
		<div>
			<Header />
			<div className="px-[10%]">
   <div className="flex flex-col items-center justify-between sm:flex-row  mt-20 mb-10 ">
    <div className="flex items-center">
							<img
								src={IArrowBack}
								alt="arrow back"
								className="cursor-pointer mr-2 sm:mr-5 mt-1 hover:bg-slate-500 p-2 rounded-full"
								onClick={(_) => navigate(-1)}
							/>{" "}
							<strong className="text-lg sm:text-2xl">View All Locations</strong>
       </div>
       <button className="px-5 mt-3 sm:mt-0 py-1 bg-slate-500 hover:bg-slate-900 rounded text-white" onClick={_=> navigate('/add-new-location')}>Add New</button>
						</div>

				{locations.length?<Table
					{...{
						data: locations,
						isLoading: modals.isLoading,
						pagination,
						setPagination,
      checkbox: {text: "Bulk Delete", action: deleteBulk},
						action: {
							text: "Delete",
							action: id => setModals((state) => ({ ...state, delete: true, userId: id })),
						},
					}}
				/>:
    <div className="flex flex-col items-center mt-20">
     <img src={IEmpty} alt="Not found"  style={{width: "100px", height: "100px"}}/>
    <h1 className="text-xl mt-10">No location at the moment</h1>
    </div>
    }
				<Delete
					{...{
						type: modals.type,
						setModal: (val) =>
							setModals((state) => ({ ...state, delete: val })),
						showModal: modals.delete,
      action: deleteAction,
      name: modals.name
					}}
				/>
			</div>
		</div>
	);
};

export default ViewLocation;
