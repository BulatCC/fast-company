export const PAGE_SIZE = 8;

export const PaginationDirection = {
    Previous: 'Previous',
    Next: 'Next'
} as const;

export const SortOrder = {
    Asc: 'Asc',
    Desc: 'Desc'
} as const;

export const AppRoute = {
    Root: '/',
    NotFound: '*',
    Login: '/login',
    Users: '/users',
    Id: ':id'
};
