import { UserType } from '../types/user.type';
import { Quality } from './Quality';
import { Bookmark } from './Bookmark';

interface UserProps {
    userData: UserType;
    handleDelete: (id: string) => void;
};

const User = (
    {
        userData:
        {
            _id,
            name,
            qualities,
            profession: { name: professionName },
            completedMeetings,
            rate,
            bookmark
        },
        handleDelete
    }: UserProps): JSX.Element => {
    return (
        <tr key={_id}>
            <th>{name}</th>
            <td>{qualities.map((quality) => <Quality qualityValue={quality} key={quality._id} />)}</td>
            <td>{professionName}</td>
            <td>{completedMeetings}</td>
            <td>{rate}</td>
            <td><Bookmark bookmark={bookmark} /></td>
            <td>
                <button className="btn btn-danger" onClick={() => { handleDelete(_id); }}>Delete</button>
            </td>
        </tr>
    );
};

export { User };
