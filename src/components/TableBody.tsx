import { ITable } from '../types/table.type';
import { IUser } from '../types/user.type';
import { getObjByString } from '../services/utils';

interface TableBodyProps {
    data: IUser[];
    columns: ITable;
};

const TableBody = ({ data, columns }: TableBodyProps): JSX.Element => {
    const renderContent = (item: IUser, path: string, component: (item: IUser) => JSX.Element): string | JSX.Element => {
        if (typeof component === 'function') {
            return component(item);
        }
        return getObjByString(item, path);
    };

    return (<tbody>
        {data.map((item) => (
            <tr key={item._id}>
                {Object.values(columns).map(({ path, title, component }) => (
                    <td key={title}>
                        {renderContent(item, path, component)}
                    </td>
                )
                )}
            </tr>
        ))}
    </tbody>);
};

export { TableBody };
