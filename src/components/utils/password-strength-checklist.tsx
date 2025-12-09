import { IconCircleCheckFilled, IconCircleX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { PasswordCheck } from "@/lib/utils/password-checker";

const passwordCheckIcon = (item: boolean) => {
  if (item) return <IconCircleCheckFilled />;

  return <IconCircleX />;
};

export default function PasswordStrengthChecklist({
  passwordCheckerResult,
}: {
  passwordCheckerResult: PasswordCheck;
}) {
  return (
    <div className={"text-sm mt-2"}>
      <div
        className={cn(
          "flex items-center gap-2 font-medium",
          passwordCheckerResult.hasCapitalLetter
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        {passwordCheckIcon(passwordCheckerResult.hasCapitalLetter)}
        <p>At least 1 capital letter</p>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 font-medium",
          passwordCheckerResult.hasNumber ? "text-green-500" : "text-red-500"
        )}
      >
        {passwordCheckIcon(passwordCheckerResult.hasNumber)}
        <p>At least 1 number</p>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 font-medium",
          passwordCheckerResult.hasSpecialCharacter
            ? "text-green-500"
            : "text-red-500"
        )}
      >
        {passwordCheckIcon(passwordCheckerResult.hasSpecialCharacter)}
        <p>At least 1 special character</p>
      </div>
      <div
        className={cn(
          "flex items-center gap-2 font-medium",
          passwordCheckerResult.length ? "text-green-500" : "text-red-500"
        )}
      >
        {passwordCheckIcon(passwordCheckerResult.length)}
        <p>Length of at least 8</p>
      </div>
    </div>
  );
}
