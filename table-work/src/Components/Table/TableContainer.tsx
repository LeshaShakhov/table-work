import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ITEMS_PER_PAGE} from "../../CONSTANTS/CONSTANTS";
import {Paginator} from "../Common/Paginator/Paginator";
import {Search} from "./Search";
import {Info} from "./Info";
import {AddItem} from "./AddItem";
import {Table, TableDataType} from "./Table";

type TablePropType = {
    dataUrl: string
}
export type DataType = TableDataType & {
    address: {
        streetAddress: string,
        city: string,
        state: string,
        zip: string
    },
    description: string,
}
export type SortType = {
    sortKey: string
    isRevers: boolean | null
}

export const TableContainer: React.FC<TablePropType> = ({dataUrl}) => {
    const [data, setData] = useState<DataType[]>([]);
    const [tableData, setTableData] = useState<TableDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortType, setSortType] = useState<SortType>({
        sortKey: 'none',
        isRevers: null
    });
    const [paginationValue, setPaginationValue] = useState(0);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedClient, setSelectedClient] = useState<DataType | null>(null);
    const [error, setError] = useState<null | Error>(null);

    const addTableData =(data: TableDataType) => {
        setTableData(actual => {
            return [data, ...actual]
        })
    }
    const onSort = (filterName: string) => {
        setSortType((prevState) => {
            let isSortRevers;
            if ((prevState.sortKey === filterName) && prevState.isRevers) {
                isSortRevers = null
            } else {
                isSortRevers = prevState.sortKey === filterName && !prevState.isRevers

            }
            const newFilterName = (prevState.sortKey === filterName && prevState.isRevers) ? 'none' : filterName

            return {sortKey: newFilterName, isRevers: isSortRevers}
        })
    }

    const byField =(sortKey: string) => {
        return (a: TableDataType, b: TableDataType) => {
            if (sortKey !== 'id') {
                return (a[sortKey as keyof TableDataType] as string).localeCompare(b[sortKey as keyof TableDataType] as string)
            }
            return a[sortKey as keyof TableDataType] > b[sortKey as keyof TableDataType] ? 1 : -1
        };
    }
    const sort = (data: TableDataType[]) => {
        const key = sortType.sortKey
        if (key !== 'none') {
            if (sortType.isRevers) {
                return [...data].sort(byField(key)).reverse()
            }
            return [...data].sort(byField(key))
        }
        return data
    }
    const paginate = (data: TableDataType[]) => {
        return data.slice(paginationValue * ITEMS_PER_PAGE, paginationValue * ITEMS_PER_PAGE + ITEMS_PER_PAGE)
    }
    const filter = (data: TableDataType[]) => {
        if (searchTerm) {
            return data.filter((obj) => {
                let isFound = false;
                Object.values(obj).forEach(value => {
                    if (String(value).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
                        isFound = true
                        return
                    }
                })
                if (isFound) return obj
                return false
            })
        }
        return data
    }

    const select = (id: number) => {
        const selected = data.find((obj) => {
            if (obj.id === id) {
                return obj
            }
            return false
        })
        if (selected) {
            setSelectedClient(selected)
        }
    }

    const sortedTableData = sort(tableData)
    const filteredTableData = filter(sortedTableData)
    const portionedTableData = paginate(filteredTableData)
    const newId = Math.max(...tableData.map((item) => {
        return item.id
    })) + 1

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(dataUrl);
            const data: DataType[] = await response.json();
            setData(data);
            setIsLoading(false)
            setTableData(
                data.map(obj => {
                    const {address, description, ...rest} = obj
                    return rest
                })
            )
        }

        fetchData().catch((e) =>{
            setIsLoading(false)
            setError(e)
        })
    }, [dataUrl])

    return (
        <div className='table-outer'>
            <AddItem
                newId={newId}
                addTableData={addTableData}
            />
            <div className='table-filters w-100 mb-10 mt-10'>
                <Paginator paginationValue={paginationValue} filteredTableData={filteredTableData}
                           setPaginationValue={setPaginationValue}/>
                <Search setPaginationValue={setPaginationValue} setSearchTerm={setSearchTerm}/>

            </div>
            <Table
                onSort={onSort}
                sortType={sortType}
                isLoading={isLoading}
                portionedTableData={portionedTableData}
                select={select}
                error={error}
            />
            {selectedClient && <Info selectedClient={selectedClient}/>}
        </div>
    );
};

