export default function formatBDT(n: number | string) {
  const num = Number(n);
  if (!num) return "৳ —";
  return "৳ " + num.toLocaleString("en-IN");
}