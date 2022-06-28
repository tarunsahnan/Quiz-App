import React, { useState } from "react";
import "./nameForm.css";
import { Button } from "reactstrap";

const NameForm = (props) => {
  const [name, setName] = useState();
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [limit, setLimit] = useState(10);
  const submitFormHandler = (e) => {
    e.preventDefault();
    props.onSubmit(name, category, difficulty, limit);
  };

  return (
    <form onSubmit={submitFormHandler}>
      <div className="inputBlock mt-3">
        <label className=" mx-1 selectCategoryLabel" htmlFor="selectCategory">
          Name
        </label>

        <input
          type="text"
          className="inputName"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter you Name"
          required
        />
      </div>

      <Button className="mt-3 inputNameButton" color="primary">
        Continue
      </Button>
    </form>
  );
};

export default NameForm;
