import React, { useRef, useState } from "react";
import { MDBInput } from "mdbreact";
import axios from "axios";
import { Store } from "../../../Store";

export default () => {
  let [TrueFalseData, setTrueFalseData] = useState({
    correct: true,
    type: 3,
    question: "",
    score: 1,
    level: "A",
  });
  const [validationError, setValidationError] = useState('');
  let ref = useRef([]);
  let AddQuestion = () => {
    axios.post('api/lecturer/insertQuestionType3', {
      data: TrueFalseData,
    }, {
      headers: {
        "authorization": Store.getState().token
      }
    })
        .then((res) => {
          if (res.data) {
            setTrueFalseData({
              correct: true,
              type: 3,
              question: "",
              score: 1,
              level: "A",
            });
            ref.current[0].checked = true;
          }
        }).catch(err => {
      setValidationError(err.response.data.message[0].split('.')[1]);
      setTimeout(() => {
        setValidationError('');
      }, 5000);
    });
  };

  return (
      <div className="Lecturer_SelectView_Group TrueFalse">
      <textarea
          value={TrueFalseData.question}
          autoFocus={true}
          className="Question"
          placeholder="Question"
          onChange={(e) =>
              setTrueFalseData({ ...TrueFalseData, question: e.target.value })
          }
      ></textarea>
        <div className="Lecturer_SelectView_Group_InputGroup">
          <div className="Lecturer_SelectView_Group_InputGroup--sub">
            <MDBInput
                ref={(el) => {
                  ref.current[0] = el;
                }}
                type="radio"
                label=" True"
                name="radio"
                className="type_select"
                onChange={(e) =>
                    setTrueFalseData({ ...TrueFalseData, correct: true })
                }
                checked={TrueFalseData.correct}
            />

            <MDBInput
                ref={(el) => {
                  ref.current[0] = el;
                }}
                type="radio"
                label=" False"
                name="radio"
                className="type_select"
                onChange={(e) =>
                    setTrueFalseData({ ...TrueFalseData, correct: false })
                }
                checked={!TrueFalseData.correct}
            />
          </div>
          <div className="Lecturer_SelectView_Group_InputGroup--sub">
            {/* <div>
            <input
              value={TrueFalseData.score}
              placeholder="Point"
              type="number"
              className="AnswersGroup"
              onChange={(e) =>
                setTrueFalseData({ ...TrueFalseData, score: e.target.value })
              }
            />
          </div> */}
            <div>
              <span className="AnswersGroup1">Point: 1</span>
            </div>
            <div>
              <span className="AnswersGroup1">Level of difficulty: A</span>
            </div>
          </div>
        </div>
        <button className='btn' onClick={(e) => AddQuestion()}>Add question</button>
        <div className="errorMessage">{validationError}</div>
      </div>
  );
};
