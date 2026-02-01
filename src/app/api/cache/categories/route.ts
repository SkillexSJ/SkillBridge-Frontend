import { NextResponse } from "next/server";
import { getCachedCategories } from "@/lib/cached-data";


// netxtjs route handler

export async function GET() {
  try {
    const categoriesData = await getCachedCategories();

    return NextResponse.json({
      success: true,
      data: categoriesData.data || [],
    });
  } catch (error) {
    console.error("Error fetching cached categories:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch categories",
      },
      { status: 500 },
    );
  }
}
