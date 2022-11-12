type Proffession = {
    _id: string;
    name: string;
};

type Qualities = {
    _id: string;
    name: string;
    color: string;
};

export type User = {
    _id: string;
    name: string;
    profession: Proffession;
    qualities: Qualities[];
    completedMeetings: number;
    rate: number;
    bookmark: boolean;
};
