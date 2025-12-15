import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";

export default function TooltipWrapper({
  children,
  content,
}: {
  children: React.ReactNode;
  content: string;
}) {
  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{content}</TooltipContent>
      </Tooltip>
    </>
  );
}
