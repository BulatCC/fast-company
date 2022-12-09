import { IGroupeListArguments } from '../types/groupList.type';

interface GroupListProps {
    items: IGroupeListArguments;
    onItemSelect: (value: Record<string, string>) => void;
    selectedItem?: Record<string, string> | null;
    valueProperty?: string;
    contentProperty?: string;
};

const GroupList = ({
    items,
    onItemSelect,
    selectedItem,
    valueProperty = '_id',
    contentProperty = 'name'
}: GroupListProps): JSX.Element => {
    const listItems = Array.isArray(items) ? items : Object.values(items);

    return (
        <ul className="list-group me-4 mt-4">
            {listItems.map((item) => (
                <li
                    className={`list-group-item list-group-item-action ${item === selectedItem ? 'active' : ''}`}
                    role={'button'}
                    key={item[valueProperty]}
                    onClick={() => onItemSelect(item)}
                >
                    {item[contentProperty]}
                </li>
            ))}
        </ul>
    );
};

export { GroupList };
