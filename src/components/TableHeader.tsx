import { ITable } from '../types/table.type';
import { ISortParams } from '../types/sort.type';
import { IconSort } from './IconSort';

interface TableHaderProps {
    columns: ITable;
    onSort: (id: string) => void;
    currentSort: ISortParams;
};

const TableHeader = ({ columns, onSort, currentSort: { sortValue, order } }: TableHaderProps): JSX.Element => {
    const titles = Object.values(columns).map(({ title, path }) => {
        if (path) {
            return <th
                key={title}
                onClick={() => {
                    onSort(path);
                }}
                role={'button'}
            >
                {title}
                {sortValue === path && <IconSort sortOrder={order} />}
            </th>;
        } else {
            return <th key={title}>
                {title}
            </th>;
        }
    }

    );
    return (
        <thead>
            <tr>{titles}</tr>
        </thead>
    );
};

export { TableHeader };
