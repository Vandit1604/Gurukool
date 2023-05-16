import React, { useEffect, useRef, useState } from "react";
import useApi from "../../Hooks/useApi";
import SearchResults from "../SearchResults/SearchResults";
import Form from "../Ui/Form/Form";
import Classes from "./Messenger.module.css";
function NewConversation(props) {
  const { Request, Data } = useApi();
  const [Results, updateResults] = useState([]);
  const [ShowResults, setShow] = useState(false);
  const [handelSearch, updateSearch] = useState("");
  const Input = useRef();
  const HandelSubmit = (event) => {
    if (handelSearch !== Input.current.value) {
      if (Input.current.value.trim() !== "") {
        handelSearch !== Input.current.value &&
          Request("/User/Find?Name=" + Input.current.value, "GET");
      }
      updateSearch(Input.current.value);
    }
  };
  useEffect(() => {
    if (Data.length !== 0) {
      console.log(Data.User);
      updateResults(Data.User);
    }
  }, [Data]);
  const StartConversation = (id, name, image) => {
    props.StartConversation(id, name, image);
  };
  return (
    <React.Fragment>
      <Form className={Classes.InputBox} onSubmit={HandelSubmit}>
        <input
          ref={Input}
          type="text"
          placeholder="Search for Friend"
          onFocus={() => setShow(true)}
          onBlur={() => {
            setTimeout(() => {
              setShow(false);
            }, 2000);
          }}
        />
        <button type="submit">
          <i className="fas fa-search"></i>
        </button>
      </Form>
      {ShowResults && (
        <SearchResults
          className={Classes.SearchResults}
          Results={Results}
          StartConversation={StartConversation}
        />
      )}
    </React.Fragment>
  );
}

export default NewConversation;
