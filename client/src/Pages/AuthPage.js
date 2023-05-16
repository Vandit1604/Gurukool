import React from "react";
import { useParams } from "react-router";
import SignIn from "../Components/Auth/SignIn";
import SignUp from "../Components/Auth/SignUp";
import Classes from "./Pages.module.css";
import DetailForm from "../Components/Auth/DetailForm";

function AuthPage() {
  const params = useParams();
  const type = params.type;
  return (
    <section className={Classes.Section}>
      {type === "SignUp" && <SignUp />}
      {type === "SignIn" && <SignIn />}
      {type === "Update" && <DetailForm />}
    </section>
  );
}

export default AuthPage;
