import React from "react";
import {BIG_DATA_URL, SMALL_DATA_URL} from "../../CONSTANTS/CONSTANTS";


type SelectDataPropType = {
    setDataUrl: (dataUrl: string) => void
    dataUrl: string
}
export const SelectData: React.FC<SelectDataPropType> = ({setDataUrl, dataUrl}) => {

    return (
        <>
            <select value={dataUrl} onChange={(e) => setDataUrl(e.target.value)} name="dataUrl" id="dataUrl">
                <option value={''} disabled>Выберите размер данных</option>
                <option value={SMALL_DATA_URL}>small-data</option>
                <option value={BIG_DATA_URL}>big-data</option>
            </select>
        </>
    );
};