const React = require("react");
import { useDispatch, useSelector } from "react-redux";

function FetchData() {

  const dispatch = useDispatch();
  const reduxState = useSelector(state => state.ReducerTwo.customers);

  async function fetchArray() {
    const fetchData = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json());
    
      dispatch({type: "ADD_MANY_CUSTOMERS", payload: fetchData});
  };

  return (
    <div>
      <p>{typeof reduxState[0] === 'string' ? reduxState[0] : reduxState[0].title}</p>
      <button onClick={()=>fetchArray()}>Загрузка пользователей</button>
    </div>
  )
};

export { FetchData };