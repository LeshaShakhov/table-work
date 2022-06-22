import React from "react";

export type PreloaderPropsType = {
    error: null | Error
}

export const Preloader: React.FC<PreloaderPropsType> = ({error}) => {
    return (
        <tr>
            <td className='preloader' colSpan={5}>
                {
                    error
                        ? <div>
                            <p>{error.name}</p>
                            <p>{error.message}</p>
                        </div>
                        : <span>Загрузка данных таблицы...</span>
                }

            </td>
        </tr>
    );
};