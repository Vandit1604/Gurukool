import React, { useContext, useState } from "react";
import Flex from "../Ui/Flex/Flex";
import Classes from "./Navbar.module.css";
import Logo from "../Logo/Logo.jsx";
import AuthContext from "../../Context/Auth/AuthContext.js";
import AuthButtons from "./AuthButtons.jsx";
import LogOut from "./LogOut.jsx";
import HamBurger from "../Hamburger/HamBurger";
import SideNav from "./SideNav";
import BackDrop from "./BackDrop";
import Item from "../Ui/Item/Item";
import { Link } from "react-router-dom";
function Navbar() {
  const Auth = useContext(AuthContext);
  const [Active, setActive] = useState(false);
  const ToggleHamBtn = () => {
    if (Active) {
      setActive(false);
      window.onscroll = undefined;
    } else {
      setActive(true);
      window.onscroll = function () {
        window.scrollTo(0, 0);
      };
    }
  };
  return (
    <Flex className={Classes.Navbar}>
      <Logo />
      <Flex className={Classes.Nav_Box}>
        <SideNav Show={Active}>
          <div>
            <Link to="/" className="Link">
              <Item onClick={ToggleHamBtn}>
                <i className="fas fa-home"></i>Home
              </Item>
            </Link>
            <Link to="/Explore" className="Link">
              <Item onClick={ToggleHamBtn}>
                <i className="fab fa-wpexplorer"></i>Explore
              </Item>
            </Link>
            <Link to="/Forum" className="Link">
              <Item onClick={ToggleHamBtn}>
                <i className="fas fa-check-double"></i>Doubt Forum
              </Item>
            </Link>
            <Link to="/Roadmap" className="Link">
              <Item onClick={ToggleHamBtn}>
                <i className="far fa-map"></i>Roadmap
              </Item>
            </Link>
            {Auth.isUser && Auth.User !== null && (
              <React.Fragment>
                <Link to="/Messenger" className="Link">
                  <Item onClick={ToggleHamBtn}>
                    <i className="fas fa-envelope"></i>Messenger
                  </Item>
                </Link>
                <Link to={"/" + Auth.User.UserName} m className="Link">
                  <Item onClick={ToggleHamBtn}>
                    <i className="fas fa-user-alt"></i>Profile
                  </Item>
                </Link>
              </React.Fragment>
            )}
            <a
              href="https://ishaantyagi.github.io/Gurukool-Docs/"
              className="Link"
            >
              <Item onClick={ToggleHamBtn}>
                <i className="fas fa-lightbulb"></i>Project Idea
              </Item>
            </a>
          </div>

          <div className={Classes.NavbarContent} onClick={ToggleHamBtn}>
            {Auth.isUser === "false" && <AuthButtons />}
            {Auth.isUser && Auth.User !== null && <LogOut />}
          </div>
        </SideNav>
        <BackDrop Show={Active} onClick={ToggleHamBtn} />
      </Flex>
      <Flex className={Classes.UserPoints}>
        {Auth.User !== null && (
          <div className={Classes.Wallet}>
            <i className="fas fa-wallet"></i>
            {Auth.User.UserPoints.Points}
          </div>
        )}
        <HamBurger onClick={ToggleHamBtn} Active={Active} />
      </Flex>
    </Flex>
  );
}

export default Navbar;
