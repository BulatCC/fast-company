import { QualitiesType } from '../types/user.type';

type QualityProps = {
    qualityValue: QualitiesType;
};

const Quality = ({ qualityValue: { _id, name, color } }: QualityProps): JSX.Element => {
    return <span className={`badge me-1 bg-${color}`} key={_id}>{name}</span>
}

export { Quality };