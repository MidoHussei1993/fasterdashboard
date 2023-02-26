export enum Pattern {
  OnlyArabicLetters = `^[\u0621-\u064A0-9 ]+$`,
  OnlyEnglishLettersAndSpace = "^[A-Za-z0-9\s!@#$%^&*()_ +=-`~\\\]\[{}|';:/.,?><]*$",
  // OnlyEnglishLettersAndSpace = `^[a-zA-Z0-9_ \-]*$`, carh only
  // OnlyEnglishLettersAndSpace=`^[a-zA-Z0-9?><;,{}\-_+=! @#$%\^&*|']*$`,
  OnlyEnglishLetters = `[-_a-zA-Z0-9]*`,
  NumberLetters = `^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$`,
  saudiMobileNumbers = `^(009665|9665|\\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$`,
  saudiaIbanNumber = '^SA\\d{4}[A-Z0-9]{18}$',
  startWithOneOrTwo = `^(1|2)\\d+`,
}
