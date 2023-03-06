import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import DataTable from "react-data-table-component";

import Start from './helper/StartExam';
import { connect } from 'react-redux';

import { Store } from '../../Store';
// //Include SCSS Files
import "./LecturerMain.scss";
import "./question.scss";


///


///
// //Own Components
import { style as ResultStyle, columns as ResultColumns } from './ResultDataTableStyle.js';
import { style as ListStyle, columns as ListColumns } from './ListDataTableStyle.js';
import CombinationOfTypes from "./Questions/CombinationOfTypes";


function Lecturer(props) {

  const url = 'api/lecturer';
  const history = useHistory();


  const [studentIDs, setStudentIDs] = useState([]);
  const [allowList, setAllowList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [groupAllow, setGroupAllow] = useState('');
  const [groupResult, setGroupResult] = useState('');
  const [filterResult, setFilterResult] = useState([]);
  const [filterAllow, setFilterAllow] = useState([]);



  let [type, setType] = useState('');

  let GetResults = () => {

    axios.get(url + "/getStudentsResult/" + groupResult).then(res => {
      setResultList([]);
      setResultList(res.data);
      setFilterResult(res.data);
    });

  };

  let FilterAllow = (value) => {
    let arr = allowList.filter(elem => elem.firstName.includes(value) || elem.lastName.includes(value));
    if (arr.length > 0) setFilterAllow(arr); else setFilterAllow(allowList);
  }

  let FilterResult = (value) => {
    let arr = resultList.filter(elem => elem.firstName.includes(value) || elem.lastName.includes(value) ||
        elem.subject.includes(value));

    if (arr.length > 0) setFilterResult(arr); else setFilterResult(resultList);
    console.log(arr)
  }



  let Insert_RemoveID = (value, insert) => {
    if (insert) setStudentIDs(array => [...array, value]); else
      setStudentIDs(array => array.filter(elem => elem !== value));
  }

  const LogOut = () => {
    Store.dispatch({ type: 'LOGOUT' });
    history.push('/');

  }


  let GetList = () => {
    axios.get(url + "/getStudentsList/" + groupAllow, {
      headers: {
        'Authorization': Store.getState().token
      }
    }).then(res => {
      setAllowList([]);
      let arr = [];
      res.data.forEach(elem => {
        arr.push({
          'firstName': elem.firstName,
          'lastName': elem.lastName,
          'allow': <input type='checkbox'
                          value={elem._id}
                          onChange={e => Insert_RemoveID(e.target.value, e.target.checked)} />
        })
      })
      setAllowList(arr);
      setFilterAllow(arr);

    });
  }



  let Examination = () => {

    return <>
      <div className="menu2" >
        <div className='menu2_input'>
          <input type='text' value={groupAllow}
                 autoFocus={true}
                 placeholder="Group"
                 className='input'
                 onKeyPress={e => { if (e.key === 'Enter') GetList() }}
                 onChange={e => setGroupAllow(e.target.value)} />
          <input type='button' className='btn' value='Find' onClick={e => GetList()} />
          <input type='button' className='btn' value='Start' onClick={e => Start()} />
        </div>
        <input type='text' className='input' placeholder='Search' onChange={e => FilterAllow(e.target.value)} />
      </div>


      <DataTable
          data={filterAllow}
          responsive={true}
          columns={ListColumns}
          customStyles={ListStyle}
          noHeader={true}
          fixedHeader={true}
          className='ListViewDatatable'
          defaultSortField='firstName'
      />
    </>
  }

  // let Settings = () => {
  //   return <div className='settings'>
  //     <div>
  //       <input type='button' className='btn' value='Change Email' />
  //       <input type='button' className='btn' value='Change Password' />
  //     </div>
  //     <div>

  //     </div>
  //   </div>

  // }

  let Result = () => {
    return <>
      <div className="menu2" >
        <div className="menu2_input">
          <input type='text' value={groupResult}
                 autoFocus={true}
                 placeholder="Group"
                 className='input'
                 onKeyPress={e => { if (e.key === 'Enter') GetResults() }}
                 onChange={e => setGroupResult(e.target.value)} />
          <input type='button' className='btn' value='Show Results' onClick={e => GetResults()} />
        </div>
        <input type='text' className='input' placeholder='Search' onChange={e => FilterResult(e.target.value)} />
      </div>

      <DataTable
          data={filterResult}
          columns={ResultColumns}
          responsive={true}
          customStyles={ResultStyle}
          noHeader={true}
          fixedHeader={true}
          className='ResultViewDatatable'
          defaultSortField='firstName'
      />
    </>
  }


  // if (!Store.getState().isAuth) return <Redirect from='/lecturer' to='/' />;
  // else 
  return (
      <>
        <div id="view">
          <div id="menu">
            <span className="name">{Store.getState().firstName} {Store.getState().lastName}</span>
            <div id="control">
              <input
                  type="button"
                  className="btn"
                  value="Result"
                  id="student"
                  onClick={(e) => setType('Result')}
              />
              <input type="button"
                     className="btn"
                     value="Add Question"
                     onClick={e => setType('Question')} />

              <input type="button"
                     autoFocus={true}
                     className="btn"
                     value="Examination"
                     onClick={e => setType('Exam')} />

              {/* <input type="button"
              className="btn"
              value="Settings"
              onClick={e => setType('Settings')} /> */}

              <input type="button"
                     className="btn"
                     value="Log Out"
                     onClick={e => LogOut()} />

              {/* <img src={require('../../assets/img/My Logo.svg')} width={100} /> */}
            </div>
          </div>
          <div id='subView'>
            {
              {
                'Exam': Examination(),
                'Result': Result(),
                'Question': CombinationOfTypes(),
                //'Settings': Settings()
              }[type]
            }
          </div>


        </div>
      </>)
}

export default connect()(Lecturer);