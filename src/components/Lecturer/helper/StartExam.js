import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import React, { useState } from 'react';
const newSwal = withReactContent(Swal);



export default () => {
    let param = {
        duration: 0,
        number: 0,
        points: 0
    };

    newSwal.fire({
        title: 'Examination',
        customClass: "startExamSwal",
        html: <>
            <input type='number'
                   placeholder={"Duration (min)"}
                   onChange={e => param.duration = e.target.value}
                   className='input' />
            <input type='number'
                   placeholder={"Number of question"}
                   onChange={e => param.number = e.target.value}
                   className='input' />
            <input type='number'
                   placeholder={"Points"}
                   onChange={e => param.points = e.target.value}
                   className='input' />
            <input type='button' value="Start" className="btn" />
        </>,
        showConfirmButton: false

    })
    //  console.log(studentIDs);
}