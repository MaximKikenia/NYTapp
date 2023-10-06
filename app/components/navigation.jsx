const React = require("react");
import {Link} from "react-router-dom";

function Navigator() {
    return (
        <nav>
            <Link className={'links'} to="/popular_articles">Popular Articles</Link>
            <Link className={'links'}  to="/popular_books">Books Best Sellers</Link>
            <Link className={'links'}  to="/about">About</Link>
        </nav>
    );
}

export default Navigator;