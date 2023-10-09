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
    async function toAPiQuery(link: any) {
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

        if (loadedContent == false) {
            console.log("Data rendering error! drawData Function.");
            return false;
        }

        const data = loadedContent.results.map((item: any, id: number) =>

            <div className="article" key={id}>
                <div className="articleId"><p>#{id + 1}</p></div>
                <h1>{item.title}</h1>
                <p className="leadText">{item.abstract}</p>
                <p className='pubDate'>Published: {item.published_date.split("-").reverse().join('.')}</p>
                <p className="pubAuth">{item.byline}</p>
                <img src={item.media[0] ? item.media[0]["media-metadata"][2].url : "https://www.buhuslugi.by/wp-content/themes/consultix/images/no-image-found-360x250.png"} alt="News Picture" />
                <p className="picDesc"><i>{item.media[0] ? item.media[0].caption : false}</i></p>
                <p className="author">Photo: {item.media[0] ? item.media[0].copyright : false}</p>
                <a target="_blank" href={item.url}><button type="button">Read more</button></a>
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
        <div className="popularArticles">
            <h1 className="pageTitle">The most popular articles on NYTimes.com based on emails & shares</h1>
            <form className="formInfo" ref={table}>
                <p>Selected source of information: <b>{source}</b></p>
                <p>Choose another: </p>
                <button type='button' onClick={loadDataByButton} className="source" id='FB'>Most shared on Facebook</button>
                <button type='button' onClick={loadDataByButton} className="source" id='Email'>Most emailed articles</button>              
                <br />

                <div className="days">
                    <div className="col">
                        <p>For the last day:</p>
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

            <div className="articleContainer">
                {loadedContent ? drawData() : <p className="dataLoadingError">Data is loading... Reload the page if no information appears after 5 seconds.</p>}
            </div>
        </div>
    )
}

export { MyName }