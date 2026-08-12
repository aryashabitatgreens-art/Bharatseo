import React from 'react';
import { TeamMember } from '../types';
import { 
  Award, 
  Target, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Linkedin, 
  Twitter, 
  Github,
  Globe,
  Building
} from 'lucide-react';

interface AboutProps {
  team: TeamMember[];
}

export const About: React.FC<AboutProps> = ({ team }) => {
  return (
    <div className="bg-[#F8FAFC] text-slate-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF9933]/15 border border-[#FF9933]/30 text-[#FF9933] text-xs font-semibold">
          <Sparkles className="w-4 h-4 text-[#FF9933]" />
          <span>India's Growth Engineers</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#1A237E] tracking-tight">
          About Bharat SEO Agency
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Founded with a clear vision: to empower Indian SMEs, startups, and global enterprises with high-ROI digital marketing, engineering, and web infrastructure.
        </p>
      </div>

      {/* Story & Mission Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1A237E]">Our Mission</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To democratize performance digital marketing and enterprise-grade web development for every business across India and abroad — replacing fluff with measurable search traffic, conversion optimizations, and transparent order tracking.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-slate-200/80 space-y-4 shadow-sm">
          <div className="w-10 h-10 rounded-lg bg-[#FF9933]/15 text-[#FF9933] flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-black text-[#1A237E]">Our Vision</h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            To build India's most trusted digital growth agency — combining high-ROI SEO strategy, bespoke web engineering, performance marketing, and automated client dashboards to scale 10,000+ businesses by 2030.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-6xl mx-auto p-8 rounded-2xl bg-white border border-slate-200/80 space-y-6 shadow-sm">
        <h2 className="text-2xl font-black text-[#1A237E] text-center">The Pillars of Bharat SEO</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-black text-[#FF9933]">1. Transparency</div>
            <p className="text-xs text-slate-600">Live order milestone timeline for every purchased campaign.</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-black text-[#FF9933]">2. Speed</div>
            <p className="text-xs text-slate-600">High performance, Core Web Vitals, and fast execution response.</p>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-black text-[#FF9933]">3. Accountability</div>
            <p className="text-xs text-slate-600">Clear KPI targets, bi-weekly reporting, and dedicated account leads.</p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF9933] bg-[#FF9933]/10 px-3 py-1 rounded-full border border-[#FF9933]/20">
            Meet Our Leadership
          </span>
          <h2 className="text-3xl font-black text-[#1A237E]">The Minds Behind Bharat SEO</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.id} className="p-6 rounded-2xl bg-white border border-slate-200/80 text-center space-y-4 shadow-sm hover:-translate-y-1 transition">
              <img
                src={member.photo}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-[#FF9933]/50 shadow-sm"
              />
              <div>
                <h3 className="text-base font-bold text-[#1A237E]">{member.name}</h3>
                <p className="text-xs text-[#FF9933] font-semibold">{member.designation}</p>
              </div>

              <div className="flex justify-center items-center space-x-3 pt-2 text-slate-400 border-t border-slate-800">
                {member.socials.linkedin && (
                  <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {member.socials.twitter && (
                  <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
                    <Twitter className="w-4 h-4" />
                  </a>
                )}
                {member.socials.github && (
                  <a href={member.socials.github} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition">
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
