import React from 'react';
import _ from 'lodash';

export default (element, index, setArrayIndex) => {
    return <div key={index} className='QuestionGroup'>
        <div className='Question'>
            <span>{index + 1}  </span> {element.question}
        </div>
        <div className='AnswersGroup'>
            {
                _.times(4, num => {
                    return <div className='AnswersGroup--sub' key={num}
                                id={'item_' + index + '_' + num}>
                        <label htmlFor={'item' + index + '_' + num + 1}>
                            <input
                                type='radio'
                                id={'item' + index + '_' + num + 1}
                                name={"item_" + index}
                                onChange={e => setArrayIndex(index, num + 1)}
                            />
                            <span> {element['answer_' + (num + 1)]}</span>
                        </label>
                    </div>
                })
            }
        </div>
    </div >
}