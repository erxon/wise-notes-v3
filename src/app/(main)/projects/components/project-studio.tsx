"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IconCards, IconBrain, IconListCheck } from "@tabler/icons-react";

export default function ProjectStudio({ _projectId }: { _projectId: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader>
          <IconCards className="h-8 w-8 mb-2 text-primary" />
          <CardTitle>Flashcards</CardTitle>
          <CardDescription>
            Generate flashcards from your documents to study key concepts.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader>
          <IconListCheck className="h-8 w-8 mb-2 text-primary" />
          <CardTitle>Quizzes</CardTitle>
          <CardDescription>
            Create practice quizzes to test your knowledge.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
        <CardHeader>
          <IconBrain className="h-8 w-8 mb-2 text-primary" />
          <CardTitle>Mind Maps</CardTitle>
          <CardDescription>
            Visualize relationships between concepts in your documents.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
