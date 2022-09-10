import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import Wallet from "./Wallet";
import "./Header.css"

import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  return <section className="header">
      <div className="title">
        <FontAwesomeIcon className="logo" icon={faListCheck} />
        <h1> TodoList</h1>
      </div>
      <ConnectButton />
    </section>;
}

export default Header;
