export const formatWord = (number: number, endPhrasePlural: string, endPhraseSingular: string) => {
    if (number > 1 && number < 5) {
        return endPhrasePlural
    }
        return endPhraseSingular;
};