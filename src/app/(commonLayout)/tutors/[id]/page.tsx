import { notFound } from "next/navigation";
import TutorProfile from "@/components/features/tutor/profile/TutorProfile";
import { getTutorById } from "@/service/tutor.service";

interface TutorProfilePageProps {
  params: {
    id: string;
  };
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
