"use server";

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function getAuthenticatedUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: key,
  });

  return await getSignedUrl(s3, command, { expiresIn: 1440 });
}

export async function getUploadUrl(
  fileName: string,
  fileType: string,
  folder: string = "uploads"
) {
  const extension = fileName.split(".").pop();
  const uniqueFileName = `${folder}/${crypto.randomUUID()}.${extension}`;

  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: uniqueFileName,
    ContentType: fileType,
  });

  const url = await getSignedUrl(s3, command, { expiresIn: 60 });
  return { url, key: uniqueFileName };
}

export async function deleteObjectFromS3(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
    Key: key,
  });

  try {
    await s3.send(command);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}
