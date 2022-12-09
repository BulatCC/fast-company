import { Quality } from './Quality';
import { IQuality } from '../types/user.type';

interface QualitiesListProps {
    qualities: IQuality[];
}

const QualitiesList = ({ qualities }: QualitiesListProps): JSX.Element => {
    return (
        <>
            {qualities.map((quality) => {
                return <Quality qualityValue={quality} key={quality._id} />;
            })}
        </>
    );
};

export { QualitiesList };
