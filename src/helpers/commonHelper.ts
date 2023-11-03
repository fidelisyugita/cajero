export function waitMoment(seconds: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, seconds);
  });
}
