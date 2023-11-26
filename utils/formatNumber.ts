// export const formatNumber = (digit: number) => {
//     return new Intl.NumberFormat('en-US').format(digit);
// };

export const formatNumber = (digit: number) => new Intl.NumberFormat('en-US').format(digit);
