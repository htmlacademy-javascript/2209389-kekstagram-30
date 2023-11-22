const verifyStringLength = (stringValue, maxLength) =>
  stringValue.length <= maxLength;

verifyStringLength('проверяемая строка', 10);

const isPalindrome = (stringValue) => {
  const modifiedString = stringValue.replaceAll(' ', '').toLowerCase();
  let reversedString = '';
  for (let i = modifiedString.length - 1; i >= 0; i--) {
    reversedString += modifiedString.at(i);
  }
  return reversedString === modifiedString;
};

isPalindrome('алала');

