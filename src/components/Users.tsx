import { useState } from 'react';
import { API } from '../api/index';
import { User } from '../types/user.type';
import { formatWord } from '../services/utils';

const Users = () => {
    const usersData = API.users.fetchAll();
    const [users, setUsers] = useState<User[]>(usersData);
    const tableTitles = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка'];

    const handleDelete = (id: string) => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
    };

    const renderPhrase = () => {
        if (users.length) {
            const formattedWord = formatWord(users.length, 'а');
            return <span className="badge bg-primary">{users.length} человек{formattedWord} тусанет с тобой сегодня</span>;
        }
        return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    };

    return (
        <>
            <h2>{renderPhrase()}</h2>
            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            {tableTitles.map((title, i) =>
                                tableTitles.length === i + 1
                                    ?
                                    <th key={title} colSpan={2}>
                                        {title}
                                    </th>
                                    :
                                    <th key={title}>{title}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(({ _id, name, qualities, profession: { name: professionName }, completedMeetings, rate }) => {
                            return (
                                <tr key={_id}>
                                    <th>{name}</th>
                                    <td>
                                        {qualities.map(({ _id, name, color }) => (
                                                <span className={`badge me-1 bg-${color}`} key={_id}>
                                                    {name}
                                                </span>)
                                        )}
                                    </td>
                                    <td>{professionName}</td>
                                    <td>{completedMeetings}</td>
                                    <td>{rate}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => { handleDelete(_id); }}>Delete</button>
                                    </td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
            )}
        </>
    );
};

export { Users };
