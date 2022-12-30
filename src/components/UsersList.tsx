import { useState, useEffect, ChangeEvent } from 'react';
import { IUser } from '../types/user.type';
import { ISortParams } from '../types/sort.type';
import { SearchStatus } from './SearchStatus';
import { UserTable } from './UserTable';
import { Pagination } from './Pagination';
import { GroupList } from './GroupList';
import { TextInput } from './TextInput';
import { formatWord, paginate, SortType, searchUser } from '../services/utils';
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
    const [searchValue, setSearchValue] = useState<string>('');

    useEffect(() => {
        API.users.fetchAll()
            .then((users) => {
                setUsers(users as IUser[]);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        API.professions.fetchAll()
            .then((professions) => setProfessions(professions as Array<Record<string, string>>))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchValue]);

    const filteredUsers = selectedProf
        ? users.filter(({ profession: { name } }) => name === selectedProf.name)
        : users;

    const foundUsers = searchValue
        ? searchUser(filteredUsers, searchValue)
        : filteredUsers;

    const searchTitle = `${foundUsers.length} человек${formatWord(foundUsers.length, 'а', '')} тусан${formatWord(foundUsers.length, 'у', 'е')}т с тобой сегодня`;

    const sortedUsers = [...foundUsers].sort(SortType(sortBy.order, sortBy.sortValue as keyof IUser));

    const usersCrop = paginate(sortedUsers, currentPage, PAGE_SIZE);

    const updatePagination = (usersData: IUser[]): void => {
        if (usersData.length % PAGE_SIZE - 1 === 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleDelete = (id: string): void => {
        const filteredUsers = users.filter(({ _id }) => _id !== id);
        setUsers(filteredUsers);
        updatePagination(foundUsers);
    };

    const handleToggleBookMark = (id: string): void => {
        const updateBoormark = users.map((user) => {
            return user._id === id ? { ...user, bookmark: !user.bookmark } : user;
        });
        setUsers(updateBoormark);
    };

    const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(target.value);
        clearFilter();
    };

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
        setSearchValue('');
    };

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
                    <SearchStatus
                        length={foundUsers.length}
                        text={searchTitle}
                        errorText={'Никто с тобой не тусанет'}
                    />
                </h2>
                <TextInput
                    value={searchValue}
                    onChange={handleSearch}
                    placeholder='Поиск'
                />
                {foundUsers.length > 0 && (
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
                    itemsCount={foundUsers.length}
                    handlePageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export { UsersList };
