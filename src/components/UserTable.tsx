import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableHeader } from './TableHeader';
import { IUser } from '../types/user.type';
import { SortOrder } from '../Consts';
import { ISortParams } from '../types/sort.type';
import { Bookmark } from './Bookmark';
import { QualitiesList } from './QualitiesList';

interface UserTableProps {
    users: IUser[];
    handleDelete: (id: string) => void;
    handleToggleBookMark: (id: string) => void;
    onSort: (id: ISortParams) => void;
    currentSort: ISortParams;
};

const UserTable = ({ currentSort, onSort, users, handleToggleBookMark, handleDelete }: UserTableProps): JSX.Element => {
    const handleSort = (item: string): void => {
        if (currentSort.sortValue === item) {
            onSort({ ...currentSort, order: currentSort.order === SortOrder.Asc ? SortOrder.Desc : SortOrder.Asc });
        } else {
            onSort({ order: SortOrder.Asc, sortValue: item });
        }
    };

    const columns = {
        name: { title: 'Имя', path: 'name' },
        qualities: {
            title: 'Качества',
            component: ({ qualities }: IUser) => (<QualitiesList qualities={qualities} />)
        },
        professions: { title: 'Профессия', path: 'profession.name' },
        completedMeetings: { title: 'Встретился, раз', path: 'completedMeetings' },
        rate: { title: 'Оценка', path: 'rate' },
        bookmark: {
            title: 'Избранное',
            component: ({ bookmark, _id }: IUser) => (<Bookmark bookmark={bookmark} handleToggleBookMark={() => handleToggleBookMark(_id)} />)
        },
        delete: {
            title: '',
            component: ({ _id }: IUser) => (<button className="btn btn-danger" onClick={() => handleDelete(_id)}>Delete</button>)
        }
    };

    return (
        <Table>
            <TableHeader columns={columns} onSort={handleSort} currentSort={currentSort}/>
            <TableBody columns={columns} data={users} />
        </Table>
    );
};

export { UserTable };
