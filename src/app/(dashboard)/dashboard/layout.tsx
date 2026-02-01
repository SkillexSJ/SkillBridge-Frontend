import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  // route protection for student
  if (user.role !== "student") {
    if (user.role === "admin") redirect("/admin");
    if (user.role === "tutor") redirect("/tutor");
  }

  return <>{children}</>;
}
