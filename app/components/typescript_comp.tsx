import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";


function MyName() {

    const dispatch = useDispatch();

    //Redux: get dataLoadStatus & get Articles array
    const loadDataStatus: boolean = useSelector((state: any) => state.ReducerOne.dataLoadStatus);
    const loadedContent: any = useSelector((state: any) => state.ReducerOne.mostSharedFBArticles);

    const table = useRef(null);

    //NYT API key
    const apiKey: string = 'PG6FhGkbEcrf4L4llSKGAL6He6vlp3xT';

    const [days, setDays] = useState("1");
    const [source, setSource] = useState("Email");

    //Data Load first time function
    function loadData(days: number) {
        getEmailedData(days);
        dispatch({ type: "CHANGE_STATUS", data: true });
    }

    loadDataStatus ? false : loadData(1);

    //Request Layout
    async function toAPiQuery(link:any) {
        try {
            const response = await fetch(link);
            const responseText = await response.json();

            console.log(responseText);

            dispatch({ type: "ADD_ART_INFO", data: responseText });
        } catch (e) {
            console.log("Error loading data!");
        }
    }

    //Load data from Email layout
    function getEmailedData(days: number) {
        const link: string = 'https://api.nytimes.com/svc/mostpopular/v2/emailed/' + days + '.json?api-key=';
        toAPiQuery(link + apiKey);
    };

    //Load data from Facebook layout
    function getFaceBookData(days: number) {
        const link: string = 'https://api.nytimes.com/svc/mostpopular/v2/shared/' + days + '/facebook.json?api-key=';
        toAPiQuery(link + apiKey);
    };

    function drawData(): any {

        if(loadedContent == false) {
            console.log("Data rendering error! drawData Function.");
            return false;
        }

        const data = loadedContent.results.map((item: any, id: number) =>

            <div style={{ border: "red 1px solid", margin: "20px 0", width: "500px" }} key={id}>
                <p><b>Заголовок:</b> {item.title}</p>
                <p><b>Описание:</b> {item.abstract}</p>
                <p><b>Автор:</b> {item.byline}</p>
                <p><b>Дата публикации:</b> {item.published_date}</p>
                <img src={item.media[0] ? item.media[0]["media-metadata"][2].url : "https://www.buhuslugi.by/wp-content/themes/consultix/images/no-image-found-360x250.png"} alt="News Picture" />
                <p>{item.media[0] ? item.media[0].caption : false}</p>
                <p>Автор фото: {item.media[0] ? item.media[0].copyright : false}</p>
                <a target="_blank" href={item.url}>Читать далее</a>
            </div>);

        return data;
    }

    //Form: radio buttons switcher & load new data by selected radio button
    const handleDays = (e: any) => {
        setDays(e.target.value);
        if (source === "Facebook") { getFaceBookData(Number(e.target.value)) }
        else { getEmailedData(Number(e.target.value)) };
    };

    //Buttons: load new data by selected buttons: facebook & Email
    function loadDataByButton(event: any) {
        if (event.target.id === "FB") {
            getFaceBookData(Number(days));
            setSource("Facebook");
        } else {
            getEmailedData(Number(days));
            setSource("Email");
        }
    }

    return (
        <div>
            <br />
            <h4>The most popular articles on NYTimes.com based on emails & shares.</h4>
            <form ref={table}>Наиболее популярные новости за период:
                <p>Источник информации:</p>
                <button type='button' onClick={loadDataByButton} className="source" id='Email'>По Email</button>
                <button type='button' onClick={loadDataByButton} className="source" id='FB'>Из Facebook</button>
                <br />

                <p>Просматриваем: {source}</p>
                <div className="days">
                    <div className="col">
                        <div className="rate">
                            <input type="radio" value="1" onChange={handleDays} checked={days === '1'} />
                            <label htmlFor="1" title="text">1 day</label>

                            <input type="radio" value="7" onChange={handleDays} checked={days === '7'} />
                            <label htmlFor="2" title="text">7 days</label>

                            <input type="radio" value="30" onChange={handleDays} checked={days === '30'} />
                            <label htmlFor="3" title="text">30 days</label>
                        </div>
                    </div>
                </div>
            </form>

            {loadedContent ? drawData() : "Данные загружаются! Если в течении 5 секунд данные не загрузились, перезагрузите страницу!"}

        </div>
    )
}

export { MyName }