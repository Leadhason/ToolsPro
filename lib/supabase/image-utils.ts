import { createClient } from "./client";

export function getPublicImageUrl(filePath: string, bucketName: string = "Product_Images"): string {
  const supabase = createClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}
