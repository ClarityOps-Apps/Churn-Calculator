export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumberWithCommas = (value: string): string => {
  // Remove any non-digit characters
  const numbers = value.replace(/\D/g, '');
  // Format with commas
  return numbers.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};