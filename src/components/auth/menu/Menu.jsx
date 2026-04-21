import { Link } from "react-router-dom";
import "./Menu.css";

export const Menu = () => {
    return (
        <div className="menuPage">
            <h1 className="pageTitle">Our Menu</h1>

            <div className="regencyCard menuLinksCard">
                <ul className="menuLinkList">
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/house-teas">
                            House Teas
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/cocktails">
                            Cocktails
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/italian-sodas">
                            Italian Sodas
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/sweet-pastries">
                            Sweet Pastries
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/savory-pastries">
                            Savory Pastries
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/tarts">
                            Tarts
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/tea-sandwiches">
                            Tea Sandwiches
                        </Link>
                    </li>
                    <li className="menuLinkItem">
                        <Link className="menuLink" to="/menu/salads">
                            Salads
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};
