import { faker } from '@faker-js/faker';

const generateDonation = () => {
  const campaignNames = [
    'My awesome campaign #3',
    'My awesome campaign #4',
    'My awesome campaign #5',
    'My awesome campaign #6',
  ];
  const designations = ['General', 'Specific', 'Other'];
  const frequencies = ['One time', 'Monthly', 'Quarterly', 'Yearly'];

  const randomIndex = (length: number) => Math.floor(Math.random() * length);
  return {
    supporterName: faker.internet.userName(),
    campaignName: campaignNames[randomIndex(campaignNames.length)],
    designation: designations[randomIndex(designations.length)],
    frequency: frequencies[randomIndex(frequencies.length)],
  };
};

export { generateDonation };
