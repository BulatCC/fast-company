import { useState, useEffect } from 'react';
import { UserType } from '../types/user.type';
import { SaerchStatus } from './SaerchStatus';
import { User } from './User';
import { Pagination } from './Pagination';
import { GroupList } from './GroupList';
import { formatWord, paginate } from '../services/utils';
import { PAGE_SIZE, PaginationDirection } from '../Consts';
import { PaginationDirectionType } from '../types/pagination.type';
import { GroupeListArgumentsType } from '../types/groupList.type';
import API from '../api/index';

interface UsersProps {
    users: UserType[];
    handleDelete: (id: string) => void;
};

const Users = ({ users, handleDelete }: UsersProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [professions, setProfessions] = useState<GroupeListArgumentsType>([]);
    const [selectedProf, setSelectedProf] = useState<Record<string, string> | null>(null);
    const tableTitles = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное'];

    useEffect(() => {
        API.professions.fetchAll()
            .then((professions) => setProfessions(professions as Array<Record<string, string>>))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const titles = tableTitles.map((title, i) => (
        <th key={title} colSpan={tableTitles.length === i + 1 ? 2 : 1}>{title}</th>
    ));

    const handlePageChange = (pageChangeInfo: number | PaginationDirectionType): void => {
        if (pageChangeInfo === PaginationDirection.Previous) {
            return setCurrentPage(currentPage - 1);
        }

        if (pageChangeInfo === PaginationDirection.Next) {
            return setCurrentPage(currentPage + 1);
        }

        setCurrentPage(+pageChangeInfo);
    };

    const handleSelectProfession = (value: Record<string, string>): void => {
        setSelectedProf(value);
    };

    const filteredUsers = selectedProf
        ? users.filter(({ profession: { name } }) => name === selectedProf.name)
        : users;

    const searchTitle = `${filteredUsers.length} человек${formatWord(users.length, 'а', '')} тусан${formatWord(users.length, 'у', 'е')}т с тобой сегодня`;

    const usersCrop = paginate(filteredUsers, currentPage, PAGE_SIZE);

    const usersMarkup = usersCrop.map((userData) => (
        <User
            userData={userData}
            handleDelete={handleDelete}
            key={userData._id}
        />)
    );

    const claerFilter = (): void => {
        setSelectedProf(null);
    };

    return (
        <div className='d-flex'>
            <div>
                <GroupList
                    items={professions}
                    onItemSelect={handleSelectProfession}
                    selectedItem={selectedProf}
                />
                <button className='btn btn-secondary mt-2' onClick={claerFilter}>Сбросить</button>
            </div>

            <div>
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
                <Pagination
                    currentPage={currentPage}
                    pageSize={PAGE_SIZE}
                    itemsCount={filteredUsers.length}
                    handlePageChange={handlePageChange}
                />
            </div>

        </div>
    );
};

export { Users };
