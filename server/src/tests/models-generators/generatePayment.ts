import { faker } from '@faker-js/faker';

const paymentMethods = ['Mastercard', 'Visa'];

const randomIndex = (length: number) => Math.floor(Math.random() * length);

const generatePayment = () => {
  return {
    paymentAmount: faker.number.int(),
    paymentDate: faker.date.recent().toISOString(),
    platformFee: faker.number.int(),
    paymentProcessingFee: faker.number.int(),
    payoutAmount: faker.number.int(),
    paymentProcessor: faker.lorem.word(),
    creditCard: '**** **** **** **** 4242',
    feeCovered: faker.datatype.boolean(),
    effectiveFee: faker.number.int(),
    paymentMethod: paymentMethods[randomIndex(paymentMethods.length)],
  };
};

export { generatePayment };
