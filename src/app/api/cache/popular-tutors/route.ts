import { NextResponse } from "next/server";
import { getCachedPopularTutors, getCachedCategories } from "@/lib/cached-data";

// netxtjs route handler

export async function GET() {
  try {
    const [tutorsData, categoriesData] = await Promise.all([
      getCachedPopularTutors(),
      getCachedCategories(),
    ]);

    return NextResponse.json({
      success: true,
      tutors: tutorsData.data || [],
      categories: categoriesData.data || [],
    });
  } catch (error) {
    console.error("Error fetching cached data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch data",
      },
      { status: 500 },
    );
  }
}
