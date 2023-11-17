"use client"
import { ReactNode, useState } from 'react'
import ReactPaginate from 'react-paginate';

interface Props {
    items: ReactNode[],
    itemsPerPage: number,
    containerClassName?: string,
    activeClassName?: string
}

export default function PaginatedItems(props: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(Math.ceil(props.items.length / props.itemsPerPage));

    const startIndex = currentPage * props.itemsPerPage;
    const endIndex = startIndex + props.itemsPerPage;
    const subset = props.items.slice(startIndex, endIndex);

    const handlePageChange = (selectedPage: {selected: number}) => {
        setCurrentPage(selectedPage.selected);
    };

    return (
        <div>
            {subset.map((item, index) => (
                <div key={`pagination-item-${index}`}>{item}</div>
            ))}
            <ReactPaginate 
                pageCount={totalPages}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                containerClassName={props.containerClassName}
                activeClassName={props.activeClassName}
            />
        </div>
    )

}

