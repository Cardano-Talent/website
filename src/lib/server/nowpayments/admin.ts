import {
	PUBLIC_NOWPAYMENTS_API_HOST,
	PUBLIC_NOWPAYMENTS_API_WEBHOOK_HOST
} from '$env/static/public';
import { SECRET_NOWPAYMENTS_API_KEY } from '$env/static/private';
import { primeJobUsdPrice, primeJobUsdDiscountedPrice } from '$lib/types/billing';
import { PaymentsResourceOptions } from '$lib/types/pocketbase-types';

const host = PUBLIC_NOWPAYMENTS_API_HOST;

const options = {
	method: 'POST',
	headers: {
		'x-api-key': SECRET_NOWPAYMENTS_API_KEY,
		'Content-Type': 'application/json'
	}
};

export const createInvoice = async (
	resource: PaymentsResourceOptions,
	id: string,
	isNonProfit: boolean
): Promise<string> => {
	const payload = {
		price_amount: isNonProfit ? primeJobUsdDiscountedPrice : primeJobUsdPrice,
		price_currency: 'usd',
		ipn_callback_url: PUBLIC_NOWPAYMENTS_API_WEBHOOK_HOST,
		order_id: id,
		order_description: resource,
		success_url: PUBLIC_NOWPAYMENTS_API_WEBHOOK_HOST,
		cancel_url: 'https://cardanotalent.com',
		partially_paid_url: 'https://cardanotalent.com',
		is_fixed_rate: true,
		is_fee_paid_by_user: true
	};

	const invoiceData = await fetch(host + '/v1/invoice', {
		...options,
		body: JSON.stringify(payload)
	})
		.then((response) => {
			if (!response.ok) throw new Error('Invoice creation response was not ok');

			return response.json();
		})
		.then((data) => {
			return data.invoice_url;
		})
		.catch((error) => {
			console.error('Error:', error);
			return;
		});

	return invoiceData;
};
