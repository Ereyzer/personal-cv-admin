export function myTrottle(func, t) {
  let start;
  let end = null;
  return (...args) => {
    start = Date.now();
    if (!end) {
      end = start + t;
    }
    if (end > start) {
      return;
    }
    func.aplly(this, args);
    end = null;
  };
}
