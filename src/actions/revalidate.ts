"use server";

import { revalidatePath } from "next/cache";

export async function revalidateTutors() {
  // Clear the home page cache
  revalidatePath("/", "page");
  //clear general tutors listing
  revalidatePath("/tutors", "page");
}

export async function revalidateCategories() {
  revalidatePath("/", "page"); // Clear home page
  revalidatePath("/api/cache/categories");
}
