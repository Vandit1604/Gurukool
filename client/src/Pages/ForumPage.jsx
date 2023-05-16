import React from "react";
import Forum from "../Components/Forum/Forum";
import Classes from "./Pages.module.css";
function ForumPage() {
  return (
    <section className={Classes.Section}>
      <Forum />
    </section>
  );
}

export default ForumPage;
