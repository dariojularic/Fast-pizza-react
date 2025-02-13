function capitalizeName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function calculateTotal(arr) {
  return arr.reduce((total, item) => total + item.totalPrice, 0)
}
export { capitalizeName, calculateTotal };
// parseErrors
