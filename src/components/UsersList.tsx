import { useState, useEffect } from 'react';
import { IUser } from '../types/user.type';
import { ISortParams } from '../types/sort.type';
import { SaerchStatus } from './SaerchStatus';
import { UserTable } from './UserTable';
import { Pagination } from './Pagination';
import { GroupList } from './GroupList';
import { formatWord, paginate, SortType } from '../services/utils';
import { PAGE_SIZE, PaginationDirection, SortOrder } from '../Consts';
import { IPaginationDirection } from '../types/pagination.type';
import { IGroupeListArguments } from '../types/groupList.type';
import API from '../api/index';

const UsersList = (): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [professions, setProfessions] = useState<IGroupeListArguments>([]);
    const [selectedProf, setSelectedProf] = useState<Record<string, string> | null>(null);
    const [sortBy, setSortBy] = useState<ISortParams>({ order: SortOrder.Asc, sortValue: 'name' });
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        API.users.fetchAll()
            .then((users) => {
                setUsers(users as IUser[]);
            })
            .catch(error => console.log(error));
    }, []);

    const handleDelete = (id: string): void => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
    };

    const handleToggleBookMark = (id: string): void => {
        const updateBoormark = users.map((user) => {
            return user._id === id ? { ...user, bookmark: !user.bookmark } : user;
        });

        setUsers(updateBoormark);
    };

    useEffect(() => {
        API.professions.fetchAll()
            .then((professions) => setProfessions(professions as Array<Record<string, string>>))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handlePageChange = (pageChangeInfo: number | IPaginationDirection): void => {
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

    const sortedUsers = [...filteredUsers].sort(SortType(sortBy.order, sortBy.sortValue as keyof IUser));

    const usersCrop = paginate(sortedUsers, currentPage, PAGE_SIZE);

    const clearFilter = (): void => {
        setSelectedProf(null);
    };

    return (
        <div className='d-flex ps-3'>
            <div>
                <GroupList
                    items={professions}
                    onItemSelect={handleSelectProfession}
                    selectedItem={selectedProf}
                />
                <button className='btn btn-secondary mt-2' onClick={clearFilter}>Сбросить</button>
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
                    <UserTable
                        users={usersCrop}
                        onSort={setSortBy}
                        currentSort={sortBy}
                        handleDelete={handleDelete}
                        handleToggleBookMark={handleToggleBookMark}
                    />
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

export { UsersList };
