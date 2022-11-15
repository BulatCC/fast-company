import { useState } from 'react';
import { API } from '../api/index';
import { UserType } from '../types/user.type';
import { SaerchStatus } from './SaerchStatus';
import { User } from './User';
import { formatWord } from '../services/utils';

const Users = (): JSX.Element => {
    const usersData = API.users.fetchAll();
    const [users, setUsers] = useState<UserType[]>(usersData);
    const tableTitles = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное'];

    const handleDelete = (id: string) => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
    };

    const titles = tableTitles.map((title, i) => (
        <th key={title} colSpan={tableTitles.length === i + 1 ? 2 : 1}>{title}</th>
    ));

    const searchTitle = `${users.length} человек${formatWord(users.length, 'а', '')} тусан${formatWord(users.length, 'у', 'е')}т с тобой сегодня`;

    const usersMarkup = users.map((userData) => <User userData={userData} handleDelete={handleDelete} key={userData._id} />)

    return (
        <>
            <h2>
                <SaerchStatus
                    length={users.length}
                    text={searchTitle}
                    errorText={'Никто с тобой не тусанет'}
                />
            </h2>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>{titles}</tr>
                    </thead>
                    <tbody>{usersMarkup}</tbody>
                </table>
            )}
        </>
    );
};

export { Users };
