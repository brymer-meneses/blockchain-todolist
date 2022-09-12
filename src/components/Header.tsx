import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import "./Header.css"

import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return <section className="header">
      <div className="title">
        <FontAwesomeIcon className="logo" icon={faListCheck} size="2x"/>
        <h1> TodoList</h1>
      </div>

      <div className="connect-button"> 
        <ConnectButton />
      </div>
    </section>;
}

export default Header;
