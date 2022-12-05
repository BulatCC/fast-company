import { useState, useEffect } from 'react';
import API from './api/index';
import { Users } from './components/Users';
import { UserType } from './types/user.type';

const App = (): JSX.Element => {
    const [users, setUsers] = useState<UserType[]>([]);

    useEffect(() => {
        API.users.fetchAll()
            .then((users) => setUsers(users as UserType[]))
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id: string): void => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
    };

    return <Users users={users} handleDelete={handleDelete}/>;
};

export { App };
