
const React = require("react");
import { Route, Routes, Link } from "react-router-dom";
import { ReduxStoreComponent } from "./reduxStoreComponent.jsx";
import { FetchData } from "./asyncFunc.jsx";

//--------------------------------------------------------------



function Phone() {
    let refSmartField = React.useRef(null);
    let smartShow = () => refSmartField.current.innerHTML = "Теперь не смартфоны";

    return (
        <div>
            <h3 ref={refSmartField}>Смартфоны</h3>
            <button onClick={smartShow}>Кнопка</button>
        </div>
    )
}

function Tablet() { return <h3>Планшеты</h3>; }


function Header(props) {

    return (
        <div>
            <h2>{props.text}</h2>
            <nav>
                <Link className={'links'} to="phones">Смартфоны</Link>
                <Link className={'links'} to="tablets">Планшеты</Link>
            </nav>
            {/* Дочерние подмаршруты: доступны по адресам: main/phones и main/tablets */}
            <Routes>
                <Route path="/phones" element={<Phone />} />
                <Route path="/tablets" element={<Tablet />} />
            </Routes>
            <ReduxStoreComponent />
            <FetchData/>
            <img src={"../app/src/images/avatar.png"} alt="Аватар" />
        </div>
    )
}

export default Header;