import React from "react";


type CellPropType = {
    children: string | number
}
export const Cell: React.FC<CellPropType> = (props) => {
    return (
            <td>
                {props.children}
            </td>
    );
};