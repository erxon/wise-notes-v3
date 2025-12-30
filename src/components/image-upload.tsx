"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getUploadUrl, getAuthenticatedUrl } from "@/app/server-actions/s3";
import { Progress } from "@/components/ui/progress";

interface ImageUploadProps {
  value?: string; // This is now the S3 KEY
  onChange: (key: string) => void;
  onRemove: () => void;
  disabled?: boolean;
  className?: string;
  folder?: string;
}

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled,
  className,
  folder = "uploads",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch signed URL for existing key or use local preview
  useEffect(() => {
    async function fetchPreview() {
      if (value && !previewUrl?.startsWith("blob:")) {
        try {
          const url = await getAuthenticatedUrl(value);
          setPreviewUrl(url);
        } catch (error) {
          console.error("Error fetching preview URL:", error);
        }
      } else if (!value) {
        setPreviewUrl(null);
      }
    }
    fetchPreview();
  }, [value, previewUrl]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validation
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 2MB");
      return;
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error(
        "Invalid file type. Only JPEG, PNG, WEBP, and GIF are allowed."
      );
      return;
    }

    // Set local preview immediately
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      setIsUploading(true);
      setUploadProgress(10);

      // 1. Get presigned URL
      const { url, key } = await getUploadUrl(file.name, file.type, folder);
      setUploadProgress(30);

      // 2. Upload to S3
      const xhr = new XMLHttpRequest();
      xhr.open("PUT", url);
      xhr.setRequestHeader("Content-Type", file.type);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 70;
          setUploadProgress(30 + percentComplete);
        }
      };

      const uploadPromise = new Promise((resolve, reject) => {
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(true);
          } else {
            reject(new Error("Upload failed"));
          }
        };
        xhr.onerror = () => reject(new Error("Network error during upload"));
        xhr.send(file);
      });

      await uploadPromise;
      setUploadProgress(100);

      onChange(key);
      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image. Please try again.");
      setPreviewUrl(null); // Clear preview on error
      URL.revokeObjectURL(localUrl);
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleRemove = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    onRemove();
    setPreviewUrl(null);
  };

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div className="flex items-center gap-4">
        {previewUrl ? (
          <div className="relative w-full h-40 rounded-lg overflow-hidden border">
            <div className="absolute top-2 right-2 z-10">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={handleRemove}
                disabled={disabled || isUploading}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              src={previewUrl}
              alt="Uploaded image"
              className="object-cover"
              sizes="160px"
              unoptimized={previewUrl.startsWith("blob:")}
            />
          </div>
        ) : (
          <label
            className={cn(
              "flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50 transition-colors",
              isUploading && "opacity-50 cursor-not-allowed",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Uploading...</p>
                </div>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-xs text-muted-foreground font-semibold">
                    Upload Image
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Max 2MB
                  </p>
                </>
              )}
            </div>
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              disabled={disabled || isUploading}
              accept={ALLOWED_TYPES.join(",")}
            />
          </label>
        )}
      </div>

      {isUploading && (
        <div className="w-full space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-[10px] text-center text-muted-foreground">
            {Math.round(uploadProgress)}% uploaded
          </p>
        </div>
      )}
    </div>
  );
}
