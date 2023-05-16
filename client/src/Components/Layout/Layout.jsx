import React, { useContext } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import MessageContext from "../../Context/Messages/MessageContext";
import Footer from "../Footer/Footer";
import Message from "../Messages/Message";
import Navbar from "../Navbar/Navbar";
function Layout(props) {
  const MessageCtx = useContext(MessageContext);
  return (
    <React.Fragment>
      <Router>
        <header>
          {MessageCtx.isMessage && (
            <Message
              Message={MessageCtx.Message}
              isError={MessageCtx.isError}
            />
          )}
        </header>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>{props.children}</Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </Router>
    </React.Fragment>
  );
}

export default Layout;
