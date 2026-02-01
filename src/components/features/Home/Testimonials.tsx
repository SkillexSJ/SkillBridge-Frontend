/**
 * THIS IS  A SHARED COMPONENT USED  FROM KEBO UI
 */

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/kibo-ui/marquee";
import {
  Testimonial,
  TestimonialQuote,
  TestimonialAuthor,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialVerifiedBadge,
} from "@/components/testimonials-marquee";

export function TestimonialsMarqueeDemo2() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-4">
          What People Say About{" "}
          <span className="text-primary">SkillBridge</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied students and tutors who are already
          transforming their learning journey with us.
        </p>
      </div>

      <div className="w-full space-y-4 bg-background overflow-hidden [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
        {[TESTIMONIALS_1, TESTIMONIALS_2].map((list, index) => (
          <Marquee key={index} className="border-y border-edge">
            <MarqueeFade side="left" />
            <MarqueeFade side="right" />

            <MarqueeContent direction={index % 2 === 1 ? "right" : "left"}>
              {list.map((item, i) => (
                <MarqueeItem
                  key={i}
                  className="mx-0 h-full w-xs border-r border-edge"
                >
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <Testimonial>
                      <TestimonialQuote>
                        <p>{item.quote}</p>
                      </TestimonialQuote>

                      <TestimonialAuthor>
                        <TestimonialAvatar>
                          <TestimonialAvatarImg src={item.authorAvatar} />
                          <TestimonialAvatarRing />
                        </TestimonialAvatar>

                        <TestimonialAuthorName>
                          {item.authorName}
                          <TestimonialVerifiedBadge />
                        </TestimonialAuthorName>

                        <TestimonialAuthorTagline>
                          {item.authorTagline}
                        </TestimonialAuthorTagline>
                      </TestimonialAuthor>
                    </Testimonial>
                  </a>
                </MarqueeItem>
              ))}
            </MarqueeContent>
          </Marquee>
        ))}
      </div>
    </div>
  );
}

export const TESTIMONIALS_1 = [
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    authorName: "Alex Chen",
    authorTagline: "Software Engineering Student",
    url: "#",
    quote:
      "SkillBridge connected me with a senior developer who helped me ace my technical interviews. The platform is incredibly intuitive!",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    authorName: "Sarah Miller",
    authorTagline: "Language Enthusiast",
    url: "#",
    quote:
      "I've been learning Spanish for 3 months now. My tutor Maria is amazing and the booking system makes scheduling so easy.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    authorName: "James Wilson",
    authorTagline: "High School Student",
    url: "#",
    quote:
      "Found the perfect math tutor here. Went from failing calculus to getting an A. Highly recommend SkillBridge!",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80",
    authorName: "Maya Patel",
    authorTagline: "Aspiring Designer",
    url: "#",
    quote:
      "The UI/UX mentors on this platform are top-notch. I got portfolio reviews that really helped me land my first job.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    authorName: "David Kim",
    authorTagline: "Data Science Student",
    url: "#",
    quote:
      "Great experience! My tutor helped me understand complex Python concepts in just a few sessions.",
  },
];

export const TESTIMONIALS_2 = [
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    authorName: "Robert Fox",
    authorTagline: "Professional Tutor",
    url: "#",
    quote:
      "As a tutor, I love how easy it is to manage my schedule and payments through SkillBridge. It lets me focus on teaching.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80",
    authorName: "Emily Zhang",
    authorTagline: "Guitar Student",
    url: "#",
    quote:
      "Learning guitar online seemed daunting, but the video call quality and whiteboard tools here are fantastic.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    authorName: "Michael Brown",
    authorTagline: "Physics Graduate",
    url: "#",
    quote:
      "The Verified Badge system gave me confidence that I was booking with a qualified expert. Worth every penny.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    authorName: "Lisa Wang",
    authorTagline: "Marketing Student",
    url: "#",
    quote:
      "I've tried other platforms, but SkillBridge is by far the most user-friendly. Finding a marketing mentor was a breeze.",
  },
  {
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    authorName: "Chris Johnson",
    authorTagline: "Freelance Writer",
    url: "#",
    quote:
      "The community here is supportive and diverse. I've learned so much about creative writing in just a month.",
  },
];
