import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

function AboutProject() {
    return (
        <div className="popularArticles">
            <div className="aboutSite">
                <p>Developer: Maxim Kikenia</p>
                <div className="myPic">
                    <img src="./app/src/images/ava.png" alt="MyPic" />
                </div>
                <a target="_blank" href="https://www.linkedin.com/in/maksim-kikenia-502509290/">Write me</a>
                <p><b>Description:</b></p>
                <ul className="aboutDescription">
                    <li>The application is developed based on the NYTimes API and has 3 sections: </li>
                    <li>The first section displays the most emailed articles and most shared articles on Facebook, which
                        can be sorted by number of days: 1, 7 and 30.</li>
                    <li>The second section displays bestsellers by genre and date.</li>
                    <li>The third section displays the best stories on 20 different topics.</li>
                </ul>
                <a target="_blank" href="https://developer.nytimes.com">
                    <img src="./app/src/images/poweredby.png" alt="NYTimes data image" />
                </a>
            </div>

        </div>
    );
};

export { AboutProject };