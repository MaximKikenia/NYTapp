import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function PopularBooks() {

    const [data, setData] = useState(false);
    const [currenDay, setCurrentDay] = useState('');
    const [loadedBooks, setLoadedBooks] = useState({});
    const ApiKey = 'PG6FhGkbEcrf4L4llSKGAL6He6vlp3xT';


    //Links to HTML Elements:
    const selectList = useRef(null);
    const dateInp = useRef(null);


    //Load Data: books From NYT
    async function loadBooks(currentDate: string, fiction: string) {

        let link: string = 'https://api.nytimes.com/svc/books/v3/lists/' + currentDate + '/' + fiction + '.json?api-key=';

        const response = await fetch(link + ApiKey);
        const responseText = await response.json();

        //Current date in forme: year-mount-day
        let date = (new Date()).toISOString().split('T')[0];
        setCurrentDay(date);

        responseText ? setData(true) : false;
        responseText ? setLoadedBooks(responseText) : false;
    }

    data ? false : loadBooks(currenDay, 'Hardcover-Fiction');


    function drawBestSellersByFilter() {
        let currentDate = dateInp.current.value;
        let currentFiction = selectList.current.value;
        loadBooks(currentDate, currentFiction);
    }

    function drawBookHTML(books: any): any {

        console.log(books);

        let dataBooks = books.results.books.map((item: any, index: number) =>
            <div style={{ border: "red 1px solid", margin: "20px 0", width: "500px" }} key={index}>
                <p>Название: {item.title}</p>
                <p>Описание: {item.description}</p>
                <p>Автор: {item.author}</p>
                <p>Опубликовано: {item.publisher}</p>
                <img src={item.book_image ? item.book_image : false} alt="Book Image" />
                <div>
                    {item.buy_links.map((itemShop: any, indexShop: number) =>
                        <div key={indexShop}>
                            <a target="_blank" href={itemShop.url}>{itemShop.name}</a>
                        </div>
                    )}
                </div>
            </div>
        );

        return dataBooks;
    }

    return (
        <div>
            <br />
            <label htmlFor="fiction">Выберите вымысел:</label><br /><br />
            <select ref={selectList} id="fiction" defaultValue="hardcover-fiction" name="fiction">
                <option value="combined-print-and-e-book-fiction">Combined Print & E-Book Fiction</option>
                <option value="hardcover-fiction">Hardcover Fiction</option>
                <option value="trade-fiction-paperback">Paperback Trade Fiction</option>
            </select>

            <br /><br />
            <label htmlFor="date">По дате: </label>
            <input ref={dateInp} type="date" defaultValue={currenDay} id="date" name="date" />
            <br /><br />

            <button type="button" onClick={drawBestSellersByFilter}>Отобразить результаты.</button>

            <div>
                {data ? drawBookHTML(loadedBooks) : "Данные загружаются!"}
            </div>
        </div>
    );
};

export { PopularBooks };