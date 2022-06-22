import React from "react";
import {Stroke} from "./Stroke";
import {TABLE_HEADERS} from "../../CONSTANTS/CONSTANTS";
import {v4 as uuid} from 'uuid';
import {SortType} from "./TableContainer";
import {Preloader} from "../Common/Preloader/Preloader";

type TablePropType = {
    onSort: (filterName: string) => void
    sortType: SortType
    isLoading: boolean
    portionedTableData: TableDataType[]
    select: (id: number) => void
    error: null | Error
}
export type TableDataType = {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
}

export const Table: React.FC<TablePropType> = React.memo(({
               onSort, sortType, isLoading,
               portionedTableData, select, error
    }) => {
    console.log('render table')
    return (
        <table className='w-100 mb-20'>
                <thead>
                <tr>
                    {
                        Object.keys(TABLE_HEADERS).map((prop) => {
                            return (
                                <th
                                    key={prop}
                                    onClick={() => onSort(prop)}
                                >
                                    {TABLE_HEADERS[prop as keyof typeof TABLE_HEADERS]} {prop === sortType.sortKey && (sortType.isRevers ?
                                    <span>&#9650;</span> : <span>&#9660;</span>)}
                                </th>
                            )
                        })
                    }
                </tr>
                </thead>
                <tbody>

                {
                    isLoading || error
                        ? <Preloader error={error}/>
                        : portionedTableData.map(item => <Stroke select={select} key={uuid()} item={item}/>)

                }


                </tbody>
            </table>
    )
})

