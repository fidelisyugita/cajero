export function isValidNumber(input: string) {
  // Regular expression to match non-zero positive integers
  const regex = /^([1-9]\d*|)$/;
  return regex.test(input);
}

export function waitMoment(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
}
