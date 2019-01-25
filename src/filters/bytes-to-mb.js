export default (value) => {
  return Math.round(1000 * value / (1024 *1024)) / 1000;
}