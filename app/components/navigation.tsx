
import {Link} from "react-router-dom";

function Navigator() {
    return (
        <nav className="navigation">
            <Link className={'links'} to="/popular_articles">Popular Articles</Link>
            <Link className={'links'}  to="/popular_books">Books Best Sellers</Link>
            <Link className={'links'}  to="/top_stories">Top Stories</Link>
            <Link className={'links'}  to="/about">About</Link>
        </nav>
    );
}

export { Navigator };