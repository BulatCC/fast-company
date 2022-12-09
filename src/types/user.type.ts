interface IProfession {
    _id: string;
    name: string;
};

export interface IQuality extends IProfession {
    color: string;
};

export interface IUser extends IProfession {
    profession: IProfession;
    qualities: IQuality[];
    completedMeetings: number;
    rate: number;
    bookmark: boolean;
};
