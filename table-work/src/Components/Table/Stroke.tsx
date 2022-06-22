import React from "react";
import {TableDataType} from "./Table";
import {Cell} from "./Cell";
import {v4 as uuid} from 'uuid';

type StrokePropType = {
    item: TableDataType
    select: (id:number)=>void
}

export const Stroke: React.FC<StrokePropType> = ({item,select}) => {
    return (
        <tr onClick={()=>select(item.id)}>
                {(Object.keys(item) as (keyof TableDataType)[]).map((property) => {
                    return <Cell key={uuid()}>{item[property]}</Cell>
                })}
        </tr>
    );
};