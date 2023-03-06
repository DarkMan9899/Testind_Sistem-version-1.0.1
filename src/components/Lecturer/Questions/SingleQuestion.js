import React, { useRef, useState } from "react";
import axios from "axios";
import { Store } from "../../../Store";

export default () => {
  let elements = [];
  let ref = useRef([]);
  let [SingleData, setSingleData] = useState({
    correct: 1,
    type: 2,
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    score: 2,
    level: 'A',
  });
  const [validationError, setValidationError] = useState('');
  let AddQuestion = () => {
    axios.post("api/lecturer/insertQuestionType2", {
      data: SingleData,
    }, {
      headers: {
        "authorization": Store.getState().token
      }
    }).then((res) => {
      if (res.data) {
        setSingleData({
          correct: 1,
          question: "",
          answer_1: "",
          answer_2: "",
          answer_3: "",
          answer_4: "",
          score: 2,
          level: "A",
          type: 2
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

  for (let i = 1; i <= 4; i++) {
    elements.push(
        <div className="Lecturer_SelectView_Group_InputGroup--sub" key={i}>
          <input

              value={SingleData['answer_' + i]}
              placeholder={"Answer " + i}
              type="text"
              className="AnswersGroup"
              onChange={(e) =>
                  setSingleData({ ...SingleData, ["answer_" + i]: e.target.value })
              }
          />
          <span className="attr">
          <input
              className='radio'
              ref={(el) => (ref.current[i - 1] = el)}
              type="radio"
              name="radio"
              defaultChecked={i === 1 ? true : false}
              onChange={(e) => setSingleData({ ...SingleData, correct: i })}
          />
        </span>
        </div>
    );
  }

  return (
      <div className="Lecturer_SelectView_Group Single">
      <textarea
          autoFocus={true}
          value={SingleData.question}
          placeholder="Question"
          className="Question"
          onChange={(e) =>
              setSingleData({ ...SingleData, question: e.target.value })
          }
      ></textarea>
        <div className="Lecturer_SelectView_Group_InputGroup">
          {elements}

          <div className="Lecturer_SelectView_Group_InputGroup--sub">
            {/* <div>
            <input
              value={SingleData.score}
              placeholder=" Point"
              type="number"
              className="AnswersGroup"
              onChange={(e) =>
                setSingleData({ ...SingleData, score: e.target.value })
              }
            />
          </div> */}
            <div>
              <span className="AnswersGroup1">Point: 2</span>
            </div>
            <div>
              <span className="AnswersGroup1">Level of difficulty: A</span>
            </div>
          </div>
        </div>
        <button className="btn" onClick={(e) => AddQuestion()}>Add question</button>
        <div className="errorMessage">{validationError}</div>
      </div>
  );
};
