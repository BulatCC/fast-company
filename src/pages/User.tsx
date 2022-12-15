import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserDetails } from '../components/UserDetails';
import API from '../api/index';
import { IUser } from '../types/user.type';

const User = (): JSX.Element => {
    const [userData, setUserData] = useState<IUser>();
    const { id } = useParams();
    useEffect(() => {
        API.users.getById(id)
            .then((user) => {
                setUserData(user as IUser);
            })
            .catch(error => console.log(error));
    }, []);

    if (!userData) {
        return <h2>Loading</h2>;
    }

    return (
        <UserDetails userData={userData} />
    );
};

export { User };
