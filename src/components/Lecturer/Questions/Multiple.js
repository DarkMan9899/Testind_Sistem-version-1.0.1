import React, { useRef, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { Store } from "../../../Store";

export default () => {
  let temp = [0, 0, 0, 0, 0, 0];

  let ref = useRef([5]);
  const [MultipleData, setMultipleData] = useState({
    type: 4,
    correct: "",
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    answer_5: "",
    // answer_6: "",
    score: 3,
    level: "B",
  });

  const [validationError, setValidationError] = useState('');
  let AddQuestion = () => {
    if (new Set(temp).size >= 2) {
      MultipleData.correct = temp.join("");
    } else MultipleData.correct = ""


    axios.post("api/lecturer/insertQuestionType4", {
      data: MultipleData,
    }, {
      headers: {
        "authorization": Store.getState().token
      }
    })
        .then((res) => {
          if (res.data) {
            setMultipleData({
              question: "",
              answer_1: "",
              answer_2: "",
              answer_3: "",
              answer_4: "",
              answer_5: "",
              score: 3,
              level: "B",
              type: 4
            });
            _.map(ref.current, (obj) => {
              obj.checked = false;
            });
          }

        }).catch(err => {
      setValidationError(err.response.data.message[0].split('.')[1]);
      setTimeout(() => {
        setValidationError('');
      }, 5000);
    });
  };

  let elements = [];

  for (let i = 1; i <= 5; i++) {
    elements.push(
        <div className="Lecturer_SelectView_Group_InputGroup--sub" key={i}>
          <input
              value={MultipleData['answer_' + i]}
              placeholder={"Answer " + i}
              type="text"
              className="AnswersGroup"
              onChange={(e) =>
                  setMultipleData({
                    ...MultipleData,
                    ["answer_" + i]: e.target.value,
                  })
              }
          />
          <span className="attr">
          <input
              ref={(el) => (ref.current[i - 1] = el)}
              className="checkbox"
              type="checkbox"
              name="radio"
              onChange={(e) => {
                temp[i - 1] = e.target.checked ? 1 : 0;
              }}
          />
        </span>
        </div>
    );
  }
  return (
      <div className="Lecturer_SelectView_Group">
      <textarea
          autoFocus={true}
          value={MultipleData.question}
          placeholder="Question"
          className="Question"
          onChange={(e) =>
              setMultipleData({ ...MultipleData, question: e.target.value })
          }
      />
        <div className="Lecturer_SelectView_Group_InputGroup">
          {elements}

          <div className="Lecturer_SelectView_Group_InputGroup--sub">
            {/* <div>
            <input
              value={MultipleData.score}
              placeholder="Point"
              type="number"
              className="AnswersGroup"
              onChange={(e) =>
                setMultipleData({ ...MultipleData, score: e.target.value })
              }
            />
          </div> */}
            <div>
              <span className="AnswersGroup1">Point: 3</span>
            </div>
            <div>
              <span className="AnswersGroup1">Level of difficulty: B</span>
            </div>
          </div>
        </div>
        <button className='btn' onClick={(e) => AddQuestion()}>Add question</button>
        <div className="errorMessage">{validationError}</div>
      </div>
  );
};
