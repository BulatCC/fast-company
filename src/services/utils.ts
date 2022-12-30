import { ISort } from '../types/sort.type';
import { IUser } from '../types/user.type';
import { SortOrder } from '../Consts';

export const formatWord = (number: number, endPhrasePlural: string, endPhraseSingular: string): string => {
    if (number > 1 && number < 5) {
        return endPhrasePlural;
    }
    return endPhraseSingular;
};

export const paginate = <T>(users: T[], currentPage: number, pageSize: number): T[] => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
};

export const SortType = <T>(order: ISort, sortValue: keyof T): ((a: T, b: T) => 1 | -1) => {
    if (order === SortOrder.Asc) {
        return (a: T, b: T) => a[sortValue] > b[sortValue] ? 1 : -1;
    }
    return (a: T, b: T) => a[sortValue] > b[sortValue] ? -1 : 1;
};

export const getObjByString = (obj: any, str: string): string => {
    const splittedString = str.split('.');
    if (splittedString.length > 0) {
        return splittedString.reduce((acc, splitted) => acc[splitted], obj);
    }
    return str;
};

export const searchUser = (usersData: IUser[], pattern: string): IUser[] => {
    return usersData.filter(user => {
        return user.name.toLowerCase().includes(pattern.toLowerCase().trim());
    });
};
