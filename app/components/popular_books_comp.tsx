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

        let dataBooks = books.results.books.map((item: any, id: number) =>
            <div className="article" key={id}>
                <div className="articleId"><p>#{id + 1}</p></div>
                <h1>{item.title}</h1>
                <p className="leadText">{item.description}</p>
                <p>Author: <b>{item.author}</b></p>
                <p className='pubDate'>Publisher: <b>{item.publisher}</b></p>
                <img className="bookImg" src={item.book_image ? item.book_image : false} alt="Book Image" />
                <p><b>List of stores:</b></p>
                <div className="storeList">
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
        <div className="popularArticles">
            <h1 className="pageTitle">The New York Times Best Sellers Books lists</h1>
            <form className="formInfo">
                <label htmlFor="fiction">Select a fiction from the list:</label>
                <select className='selectTheme' ref={selectList} id="fiction" defaultValue="hardcover-fiction" name="fiction">
                    <option value="combined-print-and-e-book-fiction">Combined Print & E-Book Fiction</option>
                    <option value="hardcover-fiction">Hardcover Fiction</option>
                    <option value="trade-fiction-paperback">Paperback Trade Fiction</option>
                </select>

                <label htmlFor="date">Select date: </label>
                <input ref={dateInp} type="date" defaultValue={currenDay} id="date" name="date" /><br />
                <button className="showResButton" type="button" onClick={drawBestSellersByFilter}>Show results</button>
            </form>

            <div className="articleContainer">
                {data ? drawBookHTML(loadedBooks) : <p className="dataLoadingError">Data is loading... Reload the page if no information appears after 5 seconds.</p>}
            </div>
        </div>
    );
};

export { PopularBooks };