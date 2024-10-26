import { addDays, formatISO } from 'date-fns';
import { freeJobDurationInDays, primeJobDurationInDays } from '$lib/types/billing';

export const getExpirationDateUtc = (tier: string) => {
	const currentDate = new Date();
	const days = tier === 'free' ? freeJobDurationInDays : primeJobDurationInDays;

	const newDate = addDays(currentDate, days);

	return formatISO(newDate);
};
