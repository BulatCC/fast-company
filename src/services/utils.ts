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
