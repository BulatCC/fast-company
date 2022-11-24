import { useState } from 'react';
import { API } from './api/index';
import { Users } from './components/Users';
import { UserType } from './types/user.type';

const App = (): JSX.Element => {
    const usersData = API.users.fetchAll();
    const [users, setUsers] = useState<UserType[]>(usersData);
    const handleDelete = (id: string) => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
    };

    return (
        <Users users={users} handleDelete={handleDelete}/>
    )
};

export { App };