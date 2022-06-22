import React, {useEffect, useState} from "react";
import {TableDataType} from "./Table";
import InputMask from "react-input-mask";

type AddItemPropsType = {
    newId:number
    addTableData: (data:TableDataType)=>void
}
export const AddItem: React.FC<AddItemPropsType> = ({newId, addTableData}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<TableDataType>({id: 0, firstName: '', lastName: '', email: '', phone: ''});
    const [isFormValid, setIsFormValid] = useState(false);
    const onClickHandler = () => {
      setIsOpen((actual) => {
          return !actual
      })
    }
    useEffect(()=>{
        setFormData(actual => ({...actual, id: newId}))
    },[newId])
    const onChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const target = e.currentTarget

        setFormData((actual) => {
            return {...actual, [target.name]: target.value}
        })
    }
    useEffect(()=>{
        setIsFormValid(!!formData.id && !!formData.phone && !!formData.email && !!formData.firstName && !!formData.lastName)
    },[formData])
    const resetForm = () => {
      setFormData({id: newId, phone: '', lastName: '', email: '', firstName: ''})
    }
    console.log('render additem')
    return (
        <div className='add-item w-100 mb-20'>
            {!isOpen && <button onClick={onClickHandler}>Добавить</button>}
            {
                isOpen &&<div>
                    <div className='form-group'>
                        <label htmlFor="id">id:</label>
                        <input value={formData.id} name='id' onChange={onChangeHandler} type="number"/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="firstName">firstName:</label>
                        <input value={formData.firstName} name='firstName' onChange={onChangeHandler} type="text"/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="lastName">lastName:</label>
                        <input value={formData.lastName} name='lastName' onChange={onChangeHandler} type="text"/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">email:</label>
                        <input value={formData.email} name='email' onChange={onChangeHandler} type="email"/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">phone:</label>
                        <InputMask value={formData.phone} name='phone' mask="(999)999-9999" onChange={onChangeHandler}/>
                    </div>

                    <button
                        disabled={!isFormValid}
                        onClick={()=>{
                            addTableData(formData)
                            resetForm()
                        }}
                    >
                        Добавить
                    </button>
                    <button className='ml-10' onClick={onClickHandler}>Отмена</button>
                </div>
            }
        </div>
    );
};