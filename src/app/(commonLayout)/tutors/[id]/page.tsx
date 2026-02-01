/**
 * NODE PACKAGES
 */
import { notFound } from "next/navigation";

/**
 * COMPONENTS
 */
import TutorProfile from "@/components/features/tutor/profile/TutorProfile";

/**
 * SERVICES
 */
import { getTutorById } from "@/service/tutor.service";

interface TutorProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

const TutorProfilePage = async ({ params }: TutorProfilePageProps) => {
  const { id } = await params;

  const response = await getTutorById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  return (
    <div>
      <TutorProfile tutor={response.data} />
    </div>
  );
};

export default TutorProfilePage;
