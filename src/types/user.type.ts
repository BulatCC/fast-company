type ProffessionType = {
    _id: string;
    name: string;
};

export type QualitiesType = {
    _id: string;
    name: string;
    color: string;
};

export type UserType = {
    _id: string;
    name: string;
    profession: ProffessionType;
    qualities: QualitiesType[];
    completedMeetings: number;
    rate: number;
    bookmark: boolean;
};
