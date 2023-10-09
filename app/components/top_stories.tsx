import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function TopStories() {

    const themes = ['arts', 'automobiles', 'books/review', 'business', 'fashion', 'food', 'health', 'home', 'insider', 'magazine', 'movies', 'nyregion', 'obituaries', 'opinion', 'politics', 'realestate', 'science', 'sports', 'sundayreview', 'technology', 'theater', 't-magazine', 'travel', 'upshot', 'us', 'world'];


    const [data, setData] = useState(false);
    const [popArticles, setPopArticles] = useState({});

    async function loadBooks(field: string) {
        const ApiKey: string = 'PG6FhGkbEcrf4L4llSKGAL6He6vlp3xT';
        let link: string = 'https://api.nytimes.com/svc/topstories/v2/' + field + '.json?api-key=';
        const response = await fetch(link + ApiKey);
        const responseText = await response.json();

        setData(true);
        setPopArticles(responseText);
    }

    data ? false : loadBooks('arts');

    function changeField(event: any) {
        let filedChecked = event.target.value;
        loadBooks(filedChecked);
    }

    function drawHTML(articles: any) {

        console.log(articles);

        const data = articles.results.map((item: any, id: number) =>

            <div className="article" key={id}>
                <div className="articleId"><p>#{id + 1}</p></div>
                <h1>{item.title}</h1>
                <p className="leadText"> {item.abstract}</p>
                <p className='pubDate'>Published: {item.published_date.slice(0,10).split("-").reverse().join('.')}</p>
                <p className="pubAuth">{item.byline}</p>
                <img src={item.multimedia ? item.multimedia[1].url : "https://www.buhuslugi.by/wp-content/themes/consultix/images/no-image-found-360x250.png"} alt="News Picture" />
                <p className="picDesc"><i>{item.multimedia ? item.multimedia[1].caption : false}</i></p>
                <p className="author"> {item.multimedia ? item.multimedia[1].copyright : false}</p>
                <a target="_blank" href={item.url}><button type="button">Read more</button></a>
            </div>);

        return data;

    }


    return (
        <div className="popularArticles">
            <h1 className="pageTitle">Top Stories of articles currently on the specified section</h1>
            <form className="formInfo">
                <label htmlFor="fiction">Select the specified section from the list: </label><br />
                <select className='selectTheme' onChange={changeField} id="fiction" defaultValue="sports" name="fiction">
                    {themes.map((item, index) =>
                        <option key={index} value={item}>{item}</option>
                    )}
                </select>
            </form>

            <div className="articleContainer">
                {data ? drawHTML(popArticles) : <p className="dataLoadingError">Data is loading... Reload the page if no information appears after 5 seconds.</p>}
            </div>
        </div>
    );
};


export { TopStories };