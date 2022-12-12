import { SortOrder } from '../Consts';

interface IconSortProps {
    sortOrder: string;
};

const IconSort = ({ sortOrder }: IconSortProps): JSX.Element => {
    return <i className={`bi bi-caret-${sortOrder === SortOrder.Asc ? 'down' : 'up'}-fill m-2`}></i>;
};

export { IconSort };
