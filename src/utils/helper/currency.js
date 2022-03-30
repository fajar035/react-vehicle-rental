export const numberToRupiah = (bilangan) => {
  let separator = "";
  let number_string = bilangan;
  if (typeof bilangan === "number") {
    number_string = bilangan.toString();
  }
  let sisa = number_string.length % 3,
    rupiah = number_string.substr(0, sisa),
    ribuan = number_string.substr(sisa).match(/\d{3}/g);

  if (ribuan) {
    separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }
  return rupiah;
};
