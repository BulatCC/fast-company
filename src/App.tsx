import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { Users } from './pages/Users';
import { User } from './pages/User';
import { NotFound } from './pages/NotFound';
import { Layout } from './components/LayOut';
import { AppRoute } from './Consts';

const App = (): JSX.Element => {
    return (
        <Routes>
            <Route path={AppRoute.Root} element={<Layout />}>
                <Route path={AppRoute.Root} element={<Main />} />
                <Route path={AppRoute.Login} element={<Login />} />
                <Route path={AppRoute.Users} >
                    <Route path={AppRoute.Id} element={<User />} />
                    <Route path="" element={<Users />} />
                </Route>
                <Route path={AppRoute.NotFound} element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export { App };
