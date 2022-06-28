import React, { useEffect, useState } from "react";
import {
  Card,
  CardText,
  Button,
  CardTitle,
  CardBody,
  CardFooter,
} from "reactstrap";
import "./questions.css";
const Questions = ({ fetchedQuestion }) => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [completed, setCompleted] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false]);

  const maxScore = localStorage.getItem("maxScore")
    ? localStorage.getItem("maxScore")
    : 0;

  useEffect(() => {
    const sortedOptions = [];
    sortedOptions.push(fetchedQuestion[questionNumber].correctAnswer);

    fetchedQuestion[questionNumber].incorrectAnswers.map((item) =>
      sortedOptions.push(item)
    );

    let shuffled = sortedOptions
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    setOptions(shuffled);
  }, [questionNumber]);

  useEffect(() => {
    if (score > maxScore) localStorage.setItem("maxScore", score);
  }, completed);
  const nextQuestion = () => {
    if (selectedValue === fetchedQuestion[questionNumber].correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setQuestionNumber((prev) => prev + 1);
    setChecked([false, false, false, false]);
  };
  const submitHandler = () => {
    setCompleted(true);
  };

  const changeSelectionHandler = (e) => {
    setSelectedValue(e.target.value);
  };
  return (
    <div>
      {completed && (
        <div className="d-flex justify-content-between scoreBoard">
          <Card
            color="success"
            className="text-white text-center w-25 py-3 h2 "
          >
            <CardTitle>{`Score: ${score}`}</CardTitle>
          </Card>
          <Card
            color="success"
            className="text-white text-center w-25 py-3 h2 "
          >
            <CardTitle>{`Max Score: ${
              score > maxScore ? score : maxScore
            }`}</CardTitle>
          </Card>
        </div>
      )}
      <Card className="questionCard py-3 px-3">
        <CardTitle className="h3 ">
          <p class="text-center">{fetchedQuestion[questionNumber].question}</p>
        </CardTitle>
        <CardBody className="lead" onChange={changeSelectionHandler}>
          {options &&
            options.map((item, index) => {
              return (
                <CardText>
                  <input
                    type="radio"
                    class="form-check-input"
                    id={item}
                    name="optradio"
                    value={item}
                    checked={checked[index]}
                    onChange={() =>
                      setChecked((prev) =>
                        prev.map((key, loc) => {
                          if (index === loc) return true;
                          return false;
                        })
                      )
                    }
                    // onChange={() => checkBoxOnChangeHandler(index)}
                  />
                  <label class="form-check-label mx-1" htmlFor={item}>
                    {item}
                  </label>
                </CardText>
              );
            })}

          <Button
            color="secondary"
            className="mx-2 questionButton"
            onClick={submitHandler}
          >
            End
          </Button>

          {questionNumber < 9 && !completed && (
            <Button
              color="primary"
              className="mx-2 questionButton"
              onClick={nextQuestion}
            >
              Next
            </Button>
          )}
          {questionNumber === 9 && (
            <Button
              color="primary"
              className="mx-2 questionButton"
              onClick={submitHandler}
            >
              Submit
            </Button>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default Questions;
