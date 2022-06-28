import "./App.css";
import { Card, CardBody, CardHeader } from "reactstrap";
import { useEffect, useState } from "react";
import NameForm from "./Components/NameForm";
import Questions from "./Components/Questions";
function App() {
  const [name, setName] = useState(null);
  const [fetchedQuestion, setFetchedQuestion] = useState();

  useEffect(() => console.log(name), [name]);
  const nameInputHandler = (iname) => {
    setName(iname);
  };

  useEffect(() => {
    fetch("https://the-trivia-api.com/api/questions?limit=10")
      .then((response) => response.json())
      .then((data) => setFetchedQuestion(data));
  }, []);

  return (
    <>
      <div className="title">Quiz App</div>

      <div className="mainContainer">
        {name === null ? (
          <NameForm onSubmit={nameInputHandler} />
        ) : (
          <Questions fetchedQuestion={fetchedQuestion} />
        )}
      </div>
    </>
  );
}

export default App;
