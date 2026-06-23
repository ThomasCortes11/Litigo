import crypto from 'node:crypto';
import { URLSearchParams } from 'node:url';

const reference = 'LITIGO-TEST-123';
const amountInCents = 4990000;
const currency = 'COP';
const secret = 'test_integrity_00K60Ujz0Vyh3X1tz8xeTjWZArrFOxZw';
const publicKey = 'pub_test_BxFYLFu3BW3VFJybC347qwdPGRpMAHim';
const redirectUrl = 'http://localhost:3000/afiliacion/confirmacion?ref=' + reference;

const signature = crypto.createHash('sha256').update(`${reference}${amountInCents}${currency}${secret}`).digest('hex');

const params = new URLSearchParams({
  'public-key': publicKey,
  'currency': currency,
  'amount-in-cents': String(amountInCents),
  reference,
  'signature:integrity': signature,
  'redirect-url': redirectUrl,
});

console.log('signature', signature);
console.log('redirectUrl', redirectUrl);
console.log('checkoutUrl', `https://checkout.wompi.co/p/?${params.toString()}`);
