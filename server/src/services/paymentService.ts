/**
 * paymentService.ts - stub for payment gateway integration
 */
export async function createPaymentLink(amount, currency='INR', description='') {
  return { url: 'https://payments.example.com/pay/xyz', amount, currency };
}
