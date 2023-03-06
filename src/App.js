import React from "react";
import {Route, Routes,} from "react-router-dom";
// import {Redirect} from 'react-router-dom';
import "./App.css";

import Student from "./components/Student/Student";
import Lecturer from "./components/Lecturer/Lecturer";
import Main from './components/Main/Main';
import Admin from './components/Admin/Admin';
import {Layoute} from "./components/Layoute/layoute";


import {Store} from './Store';

//import Admin from "./components/Admin";
//import Test from './components/Student/Test';


function App() {
    window.baseURL = 'http://localhost:8000';

    // const Private = (props) => {
    //     console.log(Store.getState());
    //     if (Store.getState().isAuth) {
    //         if (Store.getState().userType === props.path.substr(1))
    //             return <Route path={props.path} component={props.component} />; else
    //             return <Redirect to={Store.getState().userType} />;
    //     }
    //     else return <Redirect to='/' />
    // }

    return (
        <Routes>
            <Route path="/" element={<Layoute/>}>
                <Route index element={<Main/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/student" element={<Student/>}/>
                <Route path="/lecturer" element={<Lecturer/>}/>
                <Route path='/*'>
                    {/*<Redirect to='/' />*/}
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
