import React, {useEffect, useRef} from "react";
import {DataType} from "./TableContainer";

export type InfoPropsType = {
    selectedClient: DataType
}
export const Info: React.FC<InfoPropsType> = ({selectedClient}) => {
    const textarea = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        if(textarea.current){
            textarea.current.style.height = textarea.current.scrollHeight + "px";
        }
    },[])
    console.log('render info')
    return (
        <div>
            <p>Выбран пользователь <b>{`${selectedClient.firstName} ${selectedClient.lastName}`}</b></p>
            <p>Описание:<br/></p>
            <p><textarea ref={textarea} className='w-100' defaultValue={selectedClient.description}/></p>
            <p>Адрес проживания: <b>{selectedClient.address.streetAddress}</b></p>
            <p>Город: <b>{selectedClient.address.city}</b></p>
            <p>Провинция/штат: <b>{selectedClient.address.state}</b></p>
            <p>Индекс: <b>{selectedClient.address.zip}</b></p>
        </div>
    );
};