import { Link } from 'react-router-dom';
import { AppRoute } from '../Consts';

const NavBar = (): JSX.Element => {
    return (
        <ul className="nav mb-3 ps-3">
            <li className="nav-item me-4">
                <Link className="nav-link" to={AppRoute.Root}>Main</Link>
            </li>
            <li className="nav-item me-4">
                <Link className="nav-link" to={AppRoute.Login}>Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to={AppRoute.Users}>Users</Link>
            </li>
        </ul>
    );
};

export { NavBar };
