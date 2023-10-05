const React = require("react");
import { useDispatch, useSelector } from "react-redux";

//-----------------------------------------------------

function ReduxStoreComponent() {
    //Get state from ReduxStore, use useSelectorFunc;
    const reduxState = useSelector(state => state.ReducerOne.cash);

    //Change state of ReduxStore, use useDespatchFunc;
    const dispatch = useDispatch();

    const addCash = () => {
        const data = {type: 'ADD_CASH', payload: 2};
        dispatch(data);
    }

    const getCash = () => {
        const data = {type: 'GET_CASH', payload: 2};
        dispatch(data);
    }

    return (
        <div>
            <h1>Redux блок</h1>
            <p>Cash: <span>{reduxState}</span></p>
            <button onClick={() => addCash()}>Прибавить</button>
            <button onClick={() => getCash()}>Убавить</button>
        </div>
    )
}

export {ReduxStoreComponent};