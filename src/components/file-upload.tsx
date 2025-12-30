"use client";

import { createClient } from "@/lib/supabase/supabaseClient"; // Your Supabase client
import { getUploadUrl } from "@/app/server-actions/s3";
import { Input } from "./ui/input";

export default function FileUpload() {
  const supabase = createClient();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Get secure URL from AWS (via Server Action)
    const { url } = await getUploadUrl(file.name, file.type);

    // 2. Upload directly to S3
    await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    });

    // 3. Save the reference in Supabase
    const s3Url = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${file.name}`;
    const { error } = await supabase
      .from("files")
      .insert({ file_name: file.name, url: s3Url });

    if (!error) alert("Uploaded and saved to database!");
  };

  return <Input type="file" onChange={handleUpload} />;
}
