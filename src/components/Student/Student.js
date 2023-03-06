import React, { useState, useRef } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

import RecordRTC from 'recordrtc';


import { connect } from 'react-redux';
import { Store } from '../../Store';

import SweetAlert from 'sweetalert';
import '../Student/StudentMain.scss';



import setSingleQuestion from "./setSingleQuestion";



function Student() {
    const url = '/Student';


    let tempAnswer = [];
    const history = useHistory();
    const [data, setData] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [buttonText, setButtonText] = useState('Start Exam');
    const [buttonDisable, setButtonDisable] = useState(false);
    const [time, setTime] = useState('00:00:00');
    const [TimeForTest, setTimeForTest] = useState({ hours: 0, minutes: 1, seconds: 0 });
    const [start, setStart] = useState(true);
    const [ids, setIds] = useState([]);

    const webcam = useRef();
    const pdfRef = useRef();
    const btnRef = useRef();


    const LogOut = () => {
        Store.dispatch({ type: 'LOGOUT' });
        history.push('/');

    }

    const StartTest = () => {


        Record();
        //GetTest();
    }

    const FinishTest = () => {

        //console.log(answers);
        // window.recorder.stopRecording(() => {
        //     window.stream.getTracks().forEach(track => track.stop());

        //     window.displaystream.getTracks().forEach(dtrack => dtrack.stop());

        //     console.log(ans);
        //     let fd = new FormData();
        //     let name = Date.now() + '.webm';
        //     fd.append(name, window.recorder.getBlob(), name);

        //     axios.post(url+'/student/upload_video', fd).then(response => {
        //         if (response.data.uploaded) {
        axios.post(url + '/TestResult', { answers: answers, ids: ids }).then(res => {
            res.data.correct.forEach((elem, index) => {
                if (elem[0] === 'i') document.getElementById('item_' + index + '_' + (parseInt(elem[2]) - 1)).insertAdjacentHTML('beforeend', '<span class="wrong_mark">&#10006</span>');
                else document.getElementById('item_' + index + '_' + (parseInt(elem[2]) - 1)).insertAdjacentHTML('beforeend', '<span class="correct_mark">&#10004</span>')

            })
        });

        //         }
        //     });

        // });
    }

    let SWErrorAlert = (msg) => {
        SweetAlert({
            title: 'Error',
            text: msg,
            icon: 'error',
            buttons: {
                confirm: { text: 'OK' },
            }
        })
    }

    // let SWWarningAlert = (msg) => {
    //     SweetAlert({
    //         title: 'Warning',
    //         text: msg,
    //         icon: 'warning',
    //         buttons: {
    //             confirm: { text: 'OK' },
    //         }
    //     })
    // }


    let Record = () => {
        // navigator.mediaDevices.getUserMedia({
        //     video: true,
        //     audio: false,
        // }).then(stream => {
        //     window.stream = stream;
        //     if (stream.active) {
        //         webcam.current.srcObject = stream;
        //         navigator.mediaDevices.getDisplayMedia({ video: true }).then(displaystream => {
        //             window.displaystream = displaystream;
        //             if (displaystream.getVideoTracks()[0].getSettings().displaySurface === "monitor") {
        //                 if (displaystream.active) {
        setButtonText('Finish Exam');
        GetTest();
        Timer();
        //                     window.recorder = new RecordRTC([stream, displaystream], {
        //                         disableLogs: true,
        //                         mimeType: 'video/webm;codecs=vp8',
        //                         type: 'video',
        //                         checkForInactiveTracks: true,
        //                     });
        //                     window.recorder.startRecording();
        //                 }
        //             } else SWErrorAlert('Share only full monitor');
        //         }).catch(err => SWErrorAlert(err.toString()));
        //     }
        // }).catch(err => SWErrorAlert(err.toString()));
    }


    let Timer = () => {

        // if (!finish) {
        let hours = TimeForTest.hours, minutes = TimeForTest.minutes, seconds = TimeForTest.seconds;
        let dh, ds, dm;
        let interval = setInterval(() => {

            if (seconds === 0 && minutes !== 0) {
                minutes--;
                seconds = 59;
            } else if (minutes === 0 && seconds === 0 && hours !== 0) {
                hours--;
                minutes = 59;
                seconds = 59;
            }

            hours < 10 ? dh = '0' + hours : dh = hours;
            minutes < 10 ? dm = '0' + minutes : dm = minutes;
            seconds < 10 ? ds = '0' + seconds : ds = seconds;
            setTime(dh + ':' + dm + ':' + ds);
            if (seconds === 10) {
                document.getElementById('show_time').style.color = '#FF0000';
            }

            if (hours === 0 && minutes === 0 && seconds === 0) {
                clearInterval(interval);
                //FinishTest();
                btnRef.current.click();
            }
            seconds--;
        }, 1000)
    }

    const setArrayIndex = (index, correct) => {
        tempAnswer[index] = correct;
        setAnswers(tempAnswer);
        console.log(answers);
    }
    let GetTest = () => {
        axios.get(url + '/GetTest').then(response => {
            response.data.forEach((element, index) => {
                tempAnswer.push(0);
                setIds(prevIds => [...prevIds, element._id]);
                setData(prevData => [...prevData, setSingleQuestion(element, index, setArrayIndex)]);
            });
            setAnswers(tempAnswer);
        })
    };

    return (

        <div className='TestView'>
            <div className='TimerView'>
                <span id='show_time'>
                    {time}
                </span>
                <input type='button' value={buttonText} ref={btnRef} onClick={() => {
                    start ? StartTest() : FinishTest();
                    setStart(false);
                }} disabled={buttonDisable} />

                <input type='button' value='Logout' onClick={() => LogOut()} />
                <video className='VideoView' ref={webcam} autoPlay={true}></video>
            </div>
            <div className='QuestionView' ref={pdfRef}>
                {
                    data.map(elem => {
                        return elem
                    })
                }
            </div>

        </div >
    )
}

export default connect()(Student);

