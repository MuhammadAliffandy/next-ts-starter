export const BASE_URL: string = process.env.NODE_ENV === 'development' ? process.env.BASE_URL_DEV || '' : process.env.BASE_URL || '';
