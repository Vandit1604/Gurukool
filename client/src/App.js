import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Route } from "react-router-dom";
import ForumPage from "./Pages/ForumPage";
import HomePage from "./Pages/HomePage";
import ExplorePage from "./Pages/ExplorePage";
import Messenger from "./Components/Messenger/Messenger";
import AuthPage from "./Pages/AuthPage";
import React, { useContext } from "react";
import AuthContext from "./Context/Auth/AuthContext";
import Roadmaps from "./Pages/Roadmaps";
import Profile from "./Pages/Profile";

function App() {
  const Auth = useContext(AuthContext);
  return (
    <Layout className="App">
      <Route path="/" element={<HomePage />} />
      <Route path="/Explore" element={<ExplorePage />} />
      <Route path="/Forum/" element={<ForumPage />} />
      <Route path="/Roadmap" element={<Roadmaps />} />
      {(Auth.isUser || Auth.User?.newUser) && (
        <Route path="/Auth/:type" element={<AuthPage />} />
      )}
      {Auth.isUser && Auth.User && (
        <React.Fragment>
          <Route path="/Messenger" element={<Messenger />} />
          <Route path="/:UserName" element={<Profile />} />
        </React.Fragment>
      )}
      <Route path="*" element={<HomePage />} />
    </Layout>
  );
}

export default App;
