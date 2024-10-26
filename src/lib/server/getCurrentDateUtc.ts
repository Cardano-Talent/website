import { formatISO } from 'date-fns';

export const getCurrentDateUtc = () => formatISO(new Date());
