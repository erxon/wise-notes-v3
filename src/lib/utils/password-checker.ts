export interface PasswordCheck {
  hasCapitalLetter: boolean;
  hasNumber: boolean;
  hasSpecialCharacter: boolean;
  length: boolean;
}

export default function passwordChecker(password: string): PasswordCheck {
  const capitalLetter = /[A-Z]/.test(password);
  const number = /\d/.test(password);
  const specialCharacter = /[@$!%*?&]/.test(password);
  const length = password.length >= 8;

  return {
    hasCapitalLetter: capitalLetter,
    hasNumber: number,
    hasSpecialCharacter: specialCharacter,
    length: length,
  };
}
