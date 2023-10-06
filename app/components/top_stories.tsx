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

            <div style={{ border: "red 1px solid", margin: "20px 0", width: "500px" }} key={id}>
                <p><b>Заголовок:</b> {item.title}</p>
                <p><b>Описание:</b> {item.abstract}</p>
                <p><b>Автор:</b> {item.byline}</p>
                <p><b>Дата публикации:</b> {item.published_date}</p>
                <img style={{ width: "100%" }} src={item.multimedia ? item.multimedia[1].url : "https://www.buhuslugi.by/wp-content/themes/consultix/images/no-image-found-360x250.png"} alt="News Picture" />
                <p>
                    Picture description: {item.multimedia ? item.multimedia[1].caption : false}
                    Copyright: {item.multimedia ? item.multimedia[1].copyright : false}
                </p>
                <a target="_blank" href={item.url}>Читать далее</a>
            </div>);

        return data;

    }


    return (
        <div>
            <h3>Top Stories of articles currently on the specified section</h3>
            <label htmlFor="fiction">Select section:</label><br />
            <select onChange={changeField} id="fiction" defaultValue="sports" name="fiction">
                {themes.map((item, index) =>
                    <option key={index} value={item}>{item}</option>
                )}
            </select>

            <div>
                {data ? drawHTML(popArticles) : "Данные загружаются!"}
            </div>
        </div>
    );
};


export { TopStories };