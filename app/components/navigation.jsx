const React = require("react");
import {Link} from "react-router-dom";

function Navigator() {
    return (
        <nav>
            <Link className={'links'} to="/main">Главная</Link>
            <Link className={'links'}  to="/about">О сайте</Link>
            <Link className={'links'}  to="/products">Not Found</Link>
        </nav>
    );
}

export default Navigator;