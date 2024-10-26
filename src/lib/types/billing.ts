import { PaymentsResourceOptions } from '$lib/types/pocketbase-types';

export const freeJobDurationInDays = 25;

export const primeJobUsdPrice = 50;
export const primeJobUsdDiscountedPrice = 25;
export const primeJobDurationInDays = 60;

export const nonProfitDiscount = 50;

export enum PaymentMethods {
	'crypto' = 'crypto',
	'card' = 'card'
}

export const PaymentResources = Object.values(PaymentsResourceOptions);
