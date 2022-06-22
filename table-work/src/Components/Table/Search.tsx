import React, {useState} from "react";

type SearchPropsType = {
    setSearchTerm: (value:string) => void
    setPaginationValue:(value:number) => void
}

export const Search: React.FC<SearchPropsType> = ({setSearchTerm, setPaginationValue}) => {
    const [value, setValue] = useState('');
    const onClickHandler = () => {
        setSearchTerm(value)
        setPaginationValue(0)
    }
    console.log('render search')
    return (
        <div className='form-group'>
            <input
                value={value}
                onChange={(e)=>{setValue(e.target.value)}}
                type="text"
            />
            <button onClick={onClickHandler}>Search</button>
        </div>
    );
};