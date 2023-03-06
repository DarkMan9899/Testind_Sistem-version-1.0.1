
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios';
import { Store } from '../../../Store';
import React from 'react';

const newSwal = withReactContent(Swal);


async function editLecturerData(data) {
    let error;
    try {
        const data2 = await axios.put('/api/admin/editLecturerData', data, {
            headers: {
                'Authorization': Store.getState().token
            }
        })
    } catch (err) {
        data.error = 'hello'
    }

    // .then(res => {

    //     if (res.data.success)
    //         newSwal.fire('Success', 'Information successfuly saved.');
    // }).catch(function (err) {

    //     data.error = err.response.data.message[0]
    //     // Store.dispatch({ error: 'error' })
    //     // console.log();
    //     // data.err = err.response.data.message[0]
    // })


    return data
}

export default (row, edit) => {
    if (edit) {
        let data = {
            firstName: row.firstName,
            lastName: row.lastName,
            password: row.password,
            email: row.email,
            old_email: row.email,
            error: ''
        }
        newSwal.fire({
            title: 'Edit Data',
            customClass: 'adminEditData',
            html: <>
                <input type='text'
                       defaultValue={row.firstName}
                       onChange={e => data.firstName = e.target.value}
                       className='admin_input' />

                <input type='text'
                       defaultValue={row.lastName}
                       onChange={e => data.lastName = e.target.value}
                       className='admin_input' />

                <input type='text'
                       defaultValue={row.password}
                       onChange={e => data.password = e.target.value}
                       className='admin_input' />

                <input type='email'
                       defaultValue={row.email}
                       onChange={e => data.email = e.target.value}
                       className='admin_input' />
                <input type='button'
                       value="Save"
                       className="admin_btn"
                       onClick={e => console.log(editLecturerData(data))} />

                <span className='error'>{data.error}</span>
            </>,

            // preConfirm: function (val) {
            //     axios.put('http://localhost:8000/admin/EditLecturerData', data, {
            //         headers: {
            //             'Authorization': Store.getState().token
            //         }
            //     }).then(res => {

            //         if (res.data.success)
            //             newSwal.fire('Success', 'Information successfuly saved.');
            //     })
            // },

            showConfirmButton: false

        })
    } else {
        // axios.delete('http://localhost:8000/admin/DeleteLecturerData?email=' + row.email,
        //     {
        //         headers: {
        //             'Authorization': Store.getState().token
        //         }
        //     }).then(res => {
        //         if (res.data.success)
        //             newSwal.fire('Success', 'Information successfuly deleted.');
        //     })
    }
}
