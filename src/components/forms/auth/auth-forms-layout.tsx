import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import Image from "next/image";

export default function AuthFormsLayout({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {children}
          <div className="relative hidden md:flex md:justify-center md:items-center">
            <Image
              src="/wise-notes-logo.png"
              alt="Image"
              className="absolute h-90 w-90 object-cover align-middle justify-center"
              width={1200}
              height={1200}
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
