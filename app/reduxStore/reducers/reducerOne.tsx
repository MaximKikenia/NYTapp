
type DataInfo = {
    dataLoadStatus: boolean,
    mostSharedFBArticles: boolean
};

type actionType = { type: string, data: object };

//Default State for reducerOne
const defaultState: DataInfo = {
    dataLoadStatus: false,
    mostSharedFBArticles: false
};

const ADD_ART_INFO: string = "ADD_ART_INFO";
const CHANGE_STATUS: string = "CHANGE_STATUS";



//Reducer 1
const ReducerOne = (state: DataInfo = defaultState, action: actionType): object => {

    switch (action.type) {
        case ADD_ART_INFO:
            return { ...state, mostSharedFBArticles: action.data }
        case CHANGE_STATUS:
            return { ...state, dataLoadStatus: action.data }
        default:
            return state
    };
};

export { ReducerOne };