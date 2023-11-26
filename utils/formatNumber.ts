// export const formatNumber = (digit: number) => {
//     return new Intl.NumberFormat('en-US').format(digit);
// };

// export const formatNumber = (digit: number) => new Intl.NumberFormat('en-US').format(digit);



export function formatNumber(digit:number) {
    return new Intl.NumberFormat('en-US').format(digit);
  }
  
  // Example usage:
  const formattedNumber = formatNumber(1234567.89);
  console.log(formattedNumber);  // Output: 1,234,567.89
  