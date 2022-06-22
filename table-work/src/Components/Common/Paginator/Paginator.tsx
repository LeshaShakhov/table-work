import React, {useEffect, useState} from "react";
import {TableDataType} from "../../Table/Table";
import {ITEMS_PER_PAGE} from "../../../CONSTANTS/CONSTANTS";
type PaginatorType = {
    setPaginationValue: (arg: any) => void
    filteredTableData: TableDataType[]
    paginationValue: number
}
export const Paginator: React.FC<PaginatorType> = ({setPaginationValue, filteredTableData, paginationValue}) => {
    const [pagesCou, setPagesCou] = useState<number[]>([]);

    const increaseValue = () => {
        setPaginationValue((actual:number) => {
            if(actual < pagesCou.length - 1) return actual + 1
            return actual

        })
    }
    const calcPaginationPages = () => {
        const itemsCou = filteredTableData.length
        setPagesCou(Array.from({length: Math.floor(itemsCou/ITEMS_PER_PAGE) + Math.ceil(itemsCou%ITEMS_PER_PAGE/ITEMS_PER_PAGE)}, (e,i) => i + 1))

    }
    const decreaseValue = () => {
        setPaginationValue((actual:number) => {
            if(actual > 0) return actual - 1
            return actual
        })
    }
    useEffect(() => {
        calcPaginationPages()
    }, [filteredTableData]);
    if(pagesCou.length > 1) return (
        <div className='paginator'>
            <button disabled={paginationValue === 0} onClick={decreaseValue}>&#9668;</button>
            {
                pagesCou.map(page =>{
                    return(
                        <span
                            key={page}
                            className={page === paginationValue + 1 ? 'active page' : 'page'}
                            onClick={()=>setPaginationValue(page - 1)}
                        >
                            {page}
                        </span>
                    )
                })
            }
            <button disabled={paginationValue === pagesCou.length -1} onClick={increaseValue}>&#9658;</button>
        </div>
    );
    return null
};