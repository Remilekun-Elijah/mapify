import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import {
	MdOutlineKeyboardArrowLeft,
	MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import "./Pagination.css";

// pagination, items
function PaginatedItems({ total, page, setPagination, itemsPerPage }) {
	const [pageCount, setPageCount] = useState(itemsPerPage);

	useEffect(() => {
		setPageCount(Math.ceil(total / itemsPerPage));
	}, [itemsPerPage, total]);

	// Invoke when user click to request another page.
	const handlePageClick = (event) => {
		window.scrollTo(0, 100);
		console.log(`User requested page number ${event.selected}`);
		setPagination((state) => {
			return { ...state, page: event.selected + 1 };
		});
	};

	return (
		<>
			<ReactPaginate
				nextLabel={<MdOutlineKeyboardArrowRight size={"25px"} />}
				onPageChange={handlePageClick}
				pageRangeDisplayed={3}
				marginPagesDisplayed={2}
				pageCount={pageCount}
				previousLabel={<MdOutlineKeyboardArrowLeft size={"25px"} />}
				pageClassName="page-item"
				pageLinkClassName="page-link"
				previousClassName="prev-item"
				previousLinkClassName="page-link"
				nextClassName="next-item"
				nextLinkClassName="page-link"
				breakLabel="..."
				breakClassName="page-item"
				breakLinkClassName="page-link"
				containerClassName="pagination"
				activeClassName="active"
				forcePage={page}
				renderOnZeroPageCount={null}
			/>
		</>
	);
}

export default PaginatedItems;
