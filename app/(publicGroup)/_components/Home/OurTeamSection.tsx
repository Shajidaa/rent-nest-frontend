import React from "react";

import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa6";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  socials: {
    facebook?: string;
    twitter?: string;
    googlePlus?: string;
    linkedin?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    name: "JOHN DOE",
    role: "Senior Real Estate Agent",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "MICHAEL SCOTT",
    role: "Property Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "AZHAGAN MARIMUTHU",
    role: "Real Estate Agent",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
  {
    name: "DAVID MILLER",
    role: "Sales Executive",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    socials: { facebook: "#", twitter: "#", linkedin: "#" },
  },
];

export default function OurTeamSection() {
  return (
    <section className="w-full bg-background py-20 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground uppercase">
            Our <span className="text-primary">Fabulous</span> Team
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto my-3 rounded-full" />
          <p className="text-sm md:text-base text-muted-foreground font-light">
            The ship set ground on the shore of this uncharted desert isle with Gilligan the Skipper too the millionaire and his wife. Movin&apos; on up to the east side. We finally got a piece of the pie.
          </p>
        </div>

        {/* Diamond Grid Layout mimicking the reference image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 items-center justify-items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="relative group flex flex-col items-center my-6">
              
              {/* Diamond Container */}
              <div className="w-48 h-48 md:w-56 md:h-56 rotate-45 overflow-hidden border-4 border-border bg-card shadow-lg transition-transform duration-300 group-hover:scale-105 flex items-center justify-center">
                
                {/* Counter-rotate image to keep it straight inside the diamond */}
                <div className="w-[141%] h-[141%] -rotate-45 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Hover Overlay with Details */}
                  <div className="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">
                      {member.role}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mb-3">
                      {member.name}
                    </h4>
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-2">
                      <a href={member.socials.facebook} className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <FaFacebook className="w-3.5 h-3.5" />
                      </a>
                      <a href={member.socials.twitter} className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <FaTwitter className="w-3.5 h-3.5" />
                      </a>
                      <a href={member.socials.linkedin} className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                        <FaLinkedin className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>

              {/* Static Name Label Below Diamond */}
              <div className="mt-15 text-center">
                <h4 className="text-sm font-bold tracking-wider text-foreground uppercase">
                  {member.name}
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {member.role}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}