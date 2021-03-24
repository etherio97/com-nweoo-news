const burmeseNumbers = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];

export default function burmeseNumber(number) {
  return number
    .toString()
    .split("")
    .map((n) => burmeseNumbers[n] || n)
    .join("");
}
