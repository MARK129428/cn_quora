export default function debounce(fn: Function, delay: number) {
  let time: NodeJS.Timeout | null = null;
  return function temp(...arg: any) {
    if (time) clearTimeout(time);
    time = setTimeout(() => {
      fn.apply(this, arg);
    }, delay);
  };
}
