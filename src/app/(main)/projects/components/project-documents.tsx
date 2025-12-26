import { Button } from "@/components/ui/button";
import { IconPlus, IconFileText, IconCalendar } from "@tabler/icons-react";
import { getProjectDocuments } from "@/app/server-actions/projects";
import AddDocumentDialog from "../dialogs/add-document-dialog";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import elapsedTime from "@/lib/utils/elapsed-time";
import RemoveDocumentButton from "./remove-document-button";

// Helper to format date safely
const formatDate = (dateString: string) => {
  try {
    return elapsedTime(dateString);
  } catch (e) {
    return "Unknown date";
  }
};

export default async function ProjectDocuments({
  projectId,
}: {
  projectId: number;
}) {
  const { data: documents } = await getProjectDocuments(projectId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Connected Documents</h2>
        <AddDocumentDialog projectId={projectId} />
      </div>

      {documents.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground animate-in fade-in-50">
          <div className="rounded-full bg-muted p-4 mb-4">
            <IconFileText className="h-8 w-8" />
          </div>
          <p className="text-lg font-medium text-foreground mb-1">
            No documents connected yet
          </p>
          <p className="text-sm mb-4">
            Connect documents from your notebooks to get started.
          </p>
          <AddDocumentDialog projectId={projectId} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((item: any) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium line-clamp-1">
                  {item.document.title || "Untitled"}
                </CardTitle>
                <CardDescription className="text-xs">
                  From: {item.document.notebook?.name || "Unknown Notebook"}
                </CardDescription>
              </CardHeader>
              <CardFooter className="text-xs text-muted-foreground justify-between">
                <span className="flex items-center gap-1">
                  <IconCalendar className="h-3 w-3" />
                  Added {formatDate(item.added_at)}
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="h-7 px-2"
                  >
                    <Link
                      href={`/editor/${
                        item.document.notebook?.id || 0
                      }/document/${item.document.id}`}
                    >
                      View
                    </Link>
                  </Button>
                  <RemoveDocumentButton
                    projectId={projectId}
                    documentId={item.document.id}
                    documentTitle={item.document.title || "Untitled"}
                  />
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
