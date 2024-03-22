import { faker } from '@faker-js/faker';

const paymentMethods = ['Mastercard', 'Visa'];

const randomIndex = (length: number) => Math.floor(Math.random() * length);

const generatePayment = () => {
  return {
    donation_id: faker.string.uuid(),
    paymentAmount: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
    paymentDate: faker.date.recent().toISOString(),
    platformFee: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
    paymentProcessingFee: parseFloat(faker.finance.amount({ min: 100, max: 10000, dec: 2 })),
    payoutAmount: parseFloat(faker.finance.amount({ min: 100, max: 1000, dec: 2 })),
    paymentProcessor: faker.lorem.word(),
    creditCard: '**** **** **** **** 4242',
    feeCovered: faker.datatype.boolean(),
    effectiveFee: parseFloat(faker.finance.amount({ min: 0, max: 100, dec: 2 })),
    paymentMethod: paymentMethods[randomIndex(paymentMethods.length)],
  };
};

export { generatePayment };
