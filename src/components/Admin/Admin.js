import React, { useEffect, useState } from "react";
import axios from "axios";

import { useHistory } from 'react-router-dom';
import DataTable from "react-data-table-component";


import { Store } from '../../Store';
import { connect } from 'react-redux';

// //Include SCSS Files
import "./AdminMain.scss";
import "../classes.scss";
// //Own Components

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import { style as ListStyle, columns as ListColumns, columns } from './ListDataTableStyle.js';



function Admin(props) {

  let url = "/admin";
  const history = useHistory();
  const [type, setType] = useState('List');
  const [list, setList] = useState([]);
  // const [resultList, setResultList] = useState([]);
  const newSwal = withReactContent(Swal);
  // const [filterResult, setFilterResult] = useState([]);
  const [filterList, setFilterList] = useState([]);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [password, setPassword] = useState('L12345678');

  const [info, setInfo] = useState();
  const [editError, setEditError] = useState('');
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPassword, setEditPassword] = useState('');
  let GetList = () => {

    useEffect(() => {
      console.time();
      axios.get("api/admin/getLecturerList").then(res => {

        setList([]);
        let arr = [];
        res.data.forEach(elem => {
          arr.push({
            'firstName': elem.firstName,
            'lastName': elem.lastName,
            'email': elem.email,
            'password': elem.password,
            'action': <div className='action'>
              <input type='button' value='Edit' className='admin_btn' onClick={e => {

              }} />
              <input type='button' value='Remove' className='admin_btn' />
            </div>
            // 'allow': <input type='checkbox' value={elem._id} onChange={e => e.target.checked ? setStudentIDs(array => [...array, e.target.value]) : setStudentIDs(studentIDs.filter(elem => elem !== e.target.value))} />
          })
        })
        setList(arr);
        setFilterList(arr);

      });
      console.timeEnd();
    }, [])

  }

  let Filter = (value) => {
    let arr = list.filter(elem => elem.firstName.includes(value) || elem.lastName.includes(value) || elem.email.includes(value));
    if (arr.length > 0) setFilterList(arr); else setFilterList(list);
  }

  const editLecturerData = async (data) => {
    let error;
    try {
      const data2 = await axios.put('/api/admin/editLecturerData', { key: 'hello' }, {
        headers: {
          'Authorization': Store.getState().token
        }
      })
    } catch (err) {
      setEditError(err.response.data.messages[0])
    }
  }

  const Edit = () => {
    console.log(editFirstName, editLastName);
    newSwal.fire({
      title: 'Edit Data',
      customClass: 'adminEditData',
      html: <>
        <input type='text'
               value={editFirstName}
               onChange={e => setEditFirstName(e.target.value)}
               className='admin_input' />

        <input type='text'
               value={editLastName}
               onChange={e => setEditLastName(e.target.value)}
               className='admin_input' />

        <input type='text'
               value={editPassword}
               onChange={e => setEditPassword(e.target.value)}
               className='admin_input' />

        <input type='email'
               value={editEmail}
               onChange={e => setEditEmail(e.target.value)}
               className='admin_input' />
        <input type='button'
               value="Save"
               className="admin_btn" />
        {/* onClick={e => console.log(editLecturerData(data))} /> */}

        <span className='error'>{editError}</span>
      </>,
      showConfirmButton: false

    })
  }

  const EditRemove = (row, edit) => {
    console.log(edit);
    console.log(row.firstName, row.lastName);
    if (edit) {
      setEditFirstName(row.firstName);
      setEditLastName(row.lastName);
      for (let i = 0; i < 1000; i++) { };
      Edit();
    }
  }






  let Add = () => {
    //console.log(firstName, lastName, email, subject);
    axios.post('api/admin/insertLecturer', {
      firstName: firstName,
      lastName: lastName,
      email: email,
      subject: subject,
      password: password
    }).then(res => {
      if (res.data.invalid) {
        setInfo(res.data.msg)
      } else {
        setInfo(res.data);
        setTimeout(() => {
          setInfo('');
        }, 3000);
        setFirstName('');
        setLastName('');
        setEmail('');
        setSubject('');
      }

      //console.log(res.data)
    })
  }

  let AddLecturer = () => {
    return <div className='admin_inputs'>
      <input type='text'
             placeholder='First Name'
             className='admin_input'
             value={firstName}
             onChange={e => setFirstName(e.target.value)} />
      <input type='text'
             placeholder='Last Name'
             className='admin_input'
             value={lastName}
             onChange={e => setLastName(e.target.value)} />

      <input type='text'
             placeholder='Subject'
             className='admin_input'
             value={subject}
             onChange={e => setSubject(e.target.value)} />

      <input type='text'
             placeholder='Email'
             value={email}
             className='admin_input'
             onChange={e => setEmail(e.target.value)} />

      <input type='text'
             placeholder='Email'
             value={password}
             className='admin_input'
             onChange={e => setPassword(e.target.value)} />
      <input type='button'
             value='Add Lecturer'
             className='admin_btn'
             onClick={e => Add()} />
      <span>{info}</span>
    </div>
  }

  const LogOut = () => {
    Store.dispatch({ type: 'LOGOUT' });
    history.push('/');
  }

  const LecturerList = () => {
    GetList();
    return <>
      <div className="admin_menu2" >
        <input type='text' className='admin_input' placeholder='Search' onChange={e => Filter(e.target.value)} />
        <input type='button' className='admin_btn' value={"click"} onClick={e => {
          console.log('hello')
        }} />
      </div>

      <DataTable
          data={filterList}
          responsive={true}
          columns={ListColumns({ setEditFirstName: setEditFirstName })}
          customStyles={ListStyle}
          noHeader={true}
          className='admin_ListViewDatatable'
          defaultSortField='firstName'
      />
    </>

  }


  return (
      <div className={'main_admin'}>
        <div id="admin_view">
          <div id="admin_menu">
            <span className="admin_name">Admin</span>
            <div id="admin_control">
              <input type='button' className='admin_btn' value='Add Lecturer' onClick={e => setType('Add')} />
              <input type='button' className='admin_btn' value='Lecturers' onClick={e => setType('List')} />
              <input type="button" className="admin_btn" value="Log Out" onClick={e => LogOut()} />
            </div>
          </div>
          <div id='admin_subView'>
            {
              {
                'List': LecturerList(),
                'Add': AddLecturer()
              }[type]
            }
          </div>


        </div>
      </div>)
}

export default connect()(Admin);