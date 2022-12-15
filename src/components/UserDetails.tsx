import { useNavigate } from 'react-router-dom';
import { IUser } from '../types/user.type';
import { QualitiesList } from '../components/QualitiesList';

interface UserDetailsProps {
    userData: IUser;
}

const UserDetails = ({
    userData: {
        name,
        profession,
        qualities,
        completedMeetings,
        rate
    }
}: UserDetailsProps): JSX.Element => {
    const navigate = useNavigate();
    const handleClick = (): void => {
        navigate('/users');
    };
    return (
        <>
            <h1>страница юзера</h1>
            <h1> {name}</h1>
            <h2>Профессия: {profession.name}</h2>
            <QualitiesList qualities={qualities} />
            <p>completedMeetings: {completedMeetings}</p>
            <h2>Rate: {rate}</h2>
            <button onClick={handleClick}>Все Пользователи</button>
        </>
    );
};

export { UserDetails };
