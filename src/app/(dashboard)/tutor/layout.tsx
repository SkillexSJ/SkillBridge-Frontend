import { requireUser } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function TutorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  if (user.role !== "tutor") {
    if (user.role === "admin") redirect("/admin");
    redirect("/dashboard");
  }

  return <>{children}</>;
}
