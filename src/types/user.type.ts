interface ProfessionType {
    _id: string;
    name: string;
};

export interface QualitiesType extends ProfessionType {
    color: string;
};

export interface UserType extends ProfessionType {
    profession: ProfessionType;
    qualities: QualitiesType[];
    completedMeetings: number;
    rate: number;
    bookmark: boolean;
};
