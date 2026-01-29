import React from "react";
import { Tutor } from "../../../../types/types";

interface TutorMentorshipProps {
    tutor: Tutor;
}

export const TutorMentorship: React.FC<TutorMentorshipProps> = ({ tutor }) => {
    return (
        <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">Group Mentorship</h2>
             <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl text-center text-zinc-400">
                Group mentorship programs will be listed here.
            </div>
        </div>
    )
}
