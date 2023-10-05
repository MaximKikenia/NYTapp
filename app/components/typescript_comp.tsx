import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


function MyName() {
    
    const dispatch = useDispatch();

    const loadDataStatus: boolean = useSelector((state:any) => state.ReducerOne.dataLoadStatus);
    const loadedContent: any  = useSelector((state:any) => state.ReducerOne.mostSharedFBArticles);

    function loadData(){
        getMostSharedArticles();
        dispatch({ type: "CHANGE_STATUS", data: true });
    }

    loadDataStatus ? false : loadData();
   

    async function getMostSharedArticles() {
        const link: string = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=';
        const apiKey: string = 'PG6FhGkbEcrf4L4llSKGAL6He6vlp3xT';

        const response = await fetch(link + apiKey);
        const responseText = await response.json();
        dispatch({ type: "ADD_ART_INFO", data: responseText });
    };

    console.log(loadedContent);

    function drawData():any {
        const data = loadedContent.results.map((item:any, id:number) => <p key={id}>{item.abstract}</p>);
        return data;
    }

    return (
        <div>
            {loadedContent ? drawData() : "Данные загружаются!"}      
        </div>
    )
}

export { MyName }