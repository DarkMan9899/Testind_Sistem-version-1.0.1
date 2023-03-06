import React, { useState } from 'react';

import IMQuestion from "./Multiple";
import ISQuestion from "./Sortable";
import ITFQuestion from "./True_False";
import ISingle from "./SingleQuestion";

export default () => {
    let attr1 = ['ITrueFalse', "ISingle", 'IMultiple', 'ISortable',];
    let attr2 = ['Is true / false', "Is single", 'Is multiple', 'Is sortable',];

    let [Question_View, setQW] = useState('ITRUEFALSE');

    return (
        <div className="question">
            <div className="question_SelectType">
                {/* <div className="question_SelectType--sub"> */}
                {
                    attr1.map((elem, index) => {
                        return (
                            <div className='type_select' key={index}>
                                <label htmlFor={elem}>
                                    <input
                                        defaultChecked={index === 0 ? true : false}
                                        id={elem}
                                        name='type'
                                        type='radio'
                                        value={elem}
                                        onChange={e => {
                                            setQW(e.target.value.toUpperCase());

                                        }} />
                                    <span> {attr2[index]}</span>
                                </label>
                            </div>
                        )
                    })
                }

                {/* </div> */}
            </div>

            <div className="Lecturer_SelectView">
                {
                    {
                        "ITRUEFALSE": <ITFQuestion />,
                        'ISINGLE': <ISingle />,
                        "IMULTIPLE": <IMQuestion />,
                        'ISORTABLE': <ISQuestion />
                    }[Question_View]
                }
            </div>
        </div>
    )
}