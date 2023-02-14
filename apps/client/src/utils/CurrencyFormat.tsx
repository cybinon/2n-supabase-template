// Custom hook
export const useCurrencyFormat = () => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MNT',
  });

  function nFormatter(num:number, digits:number) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

  return (num:number, type="normal") => {
    switch (type) {
      case "normal":
        return formatter.format(num);
      case "short":
        return "$ "+nFormatter(num, 2);
      default:
        return formatter.format(num);
    }
  };
}