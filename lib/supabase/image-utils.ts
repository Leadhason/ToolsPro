import { createClient } from "./client";

export function getPublicImageUrl(filePath: string, bucketName: string = "Product_Images"): string {
  // Handle null/undefined filePath
  if (!filePath) {
    return '/placeholder.jpg'; // Return a placeholder image path
  }
  
  const supabase = createClient();
  const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
}
