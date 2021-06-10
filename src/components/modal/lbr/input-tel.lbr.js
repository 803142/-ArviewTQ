const STARTPOSITION = 5;
const CHARPARAMETER = /\d/;
const CHARPLACE = '_';

const placeToStart = () => {
  const input = document.activeElement;
  const { value } = input;
  if (value.indexOf(CHARPLACE)) {
    input.selectionStart = value.indexOf(CHARPLACE);
    input.selectionEnd = input.selectionStart;
  }
};

const inputValueRefactor = () => {
  const input = document.activeElement;
  const { placeholder } = input;
  let str = input.value.replace(/\D/g, '');
  const def = placeholder.replace(/\D/g, '');

  if (str.startsWith(def)) {
    str = str.replace(def, '');
  } else {
    str.substring(def - 1);
  }
  let counter = 0;
  input.value = placeholder
    .split('')
    .map((char) => {
      let newChar = char;
      if (char === CHARPLACE && str[counter]) {
        newChar = str[counter];
        counter += 1;
      }
      return newChar;
    })
    .join('');
  placeToStart();
};

const preventStartValueSelect = () => {
  const input = document.activeElement;
  const place = input.selectionStart;
  if (place < STARTPOSITION) input.selectionStart = STARTPOSITION;
};

const correctChar = (char) => char.search(CHARPARAMETER) + 1;

export { placeToStart, correctChar, inputValueRefactor, preventStartValueSelect };
