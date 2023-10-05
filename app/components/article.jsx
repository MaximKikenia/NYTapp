const React = require("react");

function Article(props) {
    
    const [name, setName] = React.useState({ call: "Tomas", surname: "Braun" });

    function changeSurname() {
        name.surname === 'Braun' ? setName({ ...name, surname: "Willis" }) : setName({ ...name, surname: "Braun" })
    }

    React.useEffect(() => {  
        document.title = `Привет ${name.surname}`;
        console.log('Updated!');
    },[name.surname]);

    return (
        <div>
            <div>{props.content}</div>
            <div>Имя: {name.call} Фамилия: {name.surname}</div>
            <button className={"btn"} onClick={changeSurname}>Изменение имени</button>
        </div>
    )
};

module.exports = Article;