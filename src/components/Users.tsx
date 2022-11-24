import { useState } from 'react';
import { UserType } from '../types/user.type';
import { SaerchStatus } from './SaerchStatus';
import { User } from './User';
import { Pagination } from './Pagination';
import { formatWord, paginate } from '../services/utils';
import { PAGE_SIZE, PaginationDirection } from '../Consts';
import { PaginationDirectionType } from '../types/pagination.type';

type UsersProps = {
    users: UserType[];
    handleDelete: (id: string) => void;
};

const Users = ({ users, handleDelete }: UsersProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const tableTitles = ['Имя', 'Качества', 'Профессия', 'Встретился, раз', 'Оценка', 'Избранное'];

    const titles = tableTitles.map((title, i) => (
        <th key={title} colSpan={tableTitles.length === i + 1 ? 2 : 1}>{title}</th>
    ));

    const searchTitle = `${users.length} человек${formatWord(users.length, 'а', '')} тусан${formatWord(users.length, 'у', 'е')}т с тобой сегодня`;

    const handlePageChange = (pageChangeInfo: number | PaginationDirectionType) => {
        if (pageChangeInfo === PaginationDirection.Previous) {
            return setCurrentPage(currentPage - 1);
        }

        if (pageChangeInfo === PaginationDirection.Next) {
            return setCurrentPage(currentPage + 1);
        }

        setCurrentPage(+pageChangeInfo);
    };

    const usersCrop = paginate(users, currentPage, PAGE_SIZE);
    const usersMarkup = usersCrop.map((userData) => <User userData={userData} handleDelete={handleDelete} key={userData._id} />);

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
            <Pagination
                currentPage={currentPage}
                pageSize={PAGE_SIZE}
                itemsCount={users.length}
                handlePageChange={handlePageChange}
            />
        </>
    );
};

export { Users };
