import Document from "@/lib/types/document";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconDots } from "@tabler/icons-react";

export default function DocumentCard({ document }: { document: Document }) {
  const createdAt = new Date(document.createdAt);
  /* 
    We use a simple regex to strip HTML tags because DOMParser is not available on the server.
    Client Components are still pre-rendered on the server, causing DOMParser to crash.
  */
  const text = document.content
    ? document.content.replace(/<[^>]*>?/gm, "")
    : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{document.title}</CardTitle>
        <CardDescription>{createdAt.toDateString()}</CardDescription>
        <CardAction>
          <Button size={"icon-sm"} variant={"ghost"}>
            <IconDots />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 text-sm text-muted-foreground">
          {text.slice(0, 100) || "No content"}
        </p>
      </CardContent>
    </Card>
  );
}
