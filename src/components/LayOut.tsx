import { Outlet } from 'react-router-dom';
import { NavBar } from './NavBar';

const Layout = (): JSX.Element => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export { Layout };
