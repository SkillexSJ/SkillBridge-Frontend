"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTutors() {
  // Clear the home page cache
  revalidatePath("/", "page");
  //clear general tutors listing
  revalidatePath("/tutors", "page");
}

export async function revalidateCategories() {
  revalidateTag("categories", "max");
  revalidatePath("/", "page"); // Clear home page
  revalidatePath("/api/cache/categories");
}
