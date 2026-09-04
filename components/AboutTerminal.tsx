"use client";

import Image from "next/image";
import { useRef } from "react";
import ScrollReveal from "./ScrollReveal";
import { useSiteData } from "@/lib/siteData";

export default function AboutSection() {
  const { data } = useSiteData();
  const d = data;
  const ref = useRef(null);

  if (!d) return null;
  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden bg-transparent"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section label */}
        <ScrollReveal>
          <p className="text-sm font-medium text-[#7C3AED] mb-3 tracking-wide">
            Hakkımda
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Text */}
          <div>
            <ScrollReveal delay={0.1}>
              <h2
                className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight"
                style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
              >
                {d.about.heading}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-4 text-[#9090A8] text-base leading-relaxed">
                {d.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </ScrollReveal>

            {/* Highlight stats */}
            <ScrollReveal delay={0.35} mode="zoom-in">
                <div className="grid grid-cols-2 gap-4 mt-10">
                  {d.about.highlights.map((h) => (
                    <div key={h.label} className="card p-4 group hover:bg-[#7C3AED]/5">
                      <div className="text-2xl font-bold gradient-text mb-1">{h.value}</div>
                      <div className="text-sm text-[#9090A8]">{h.label}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              {/* Education */}
              <ScrollReveal delay={0.4} mode="fade-up">
                <div className="mt-10">
                  <p className="text-xs font-semibold text-[#4A4A60] uppercase tracking-widest mb-4">Eğitim</p>
                  <div className="space-y-4">
                    {d.about.education.map((edu) => (
                      <div key={edu.school} className="card p-4 group hover:bg-[#7C3AED]/5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold text-white">{edu.school}</div>
                            <div className="text-xs text-[#A78BFA] mt-0.5">{edu.department}</div>
                            {edu.note && <div className="text-xs text-[#9090A8] mt-1">{edu.note}</div>}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-xs text-[#4A4A60]">{edu.period}</div>
                            {edu.gpa && (
                              <div className="text-sm font-bold gradient-text mt-1">GPA: {edu.gpa}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
              {/* Certificates */}
              <ScrollReveal delay={0.5} mode="fade-up">
                <div className="mt-10">
                  <p className="text-xs font-semibold text-[#4A4A60] uppercase tracking-widest mb-4">Sertifikalar</p>
                  <div className="card p-6 bg-[#111118]/50 border border-[#1E1E2A] rounded-2xl">
                    <ul className="space-y-3">
                      {d.about.certificates.map((cert: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-[#9090A8]">
                          <span className="text-[#A78BFA] mt-1 flex-shrink-0 text-[8px]">●</span>
                          <span className="leading-relaxed">{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
          </div>

          {/* Right Column: Photo collage */}
          <ScrollReveal mode="slide-right" delay={0.2}>
            <div className="relative sticky top-28">
              <div className="glow-blob absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#7C3AED] opacity-10 -z-10" />

              {/* Main photo - Reverted to single large card */}
              <div className="relative w-full aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-[#1E1E2A] shadow-2xl group">
                <Image
                  src={d.about.photo1 || "/photos/media__1775395402266.jpg"}
                  alt="Enis Talha"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F]/50 to-transparent" />
              </div>



                <div className="mt-12 space-y-4">
                  <h3 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                    Mevcut Sorumluluklar
                  </h3>
                  
                  {(d.about.responsibilities && d.about.responsibilities.length > 0 ? d.about.responsibilities : [
                    { title: "Üniversite Başkanı", role: "Türk Dünyası Gençlik Konseyi" },
                    { title: "Kurucu Yönetim Kurulu Başkanı", role: "GTÜ Türk Dünyası Gençlik Topluluğu" },
                    { title: "Denetim Kurulu Başkanı", role: "GTÜ Havacılık ve Uzay Kulübü" },
                    { title: "Proje Koordinatörü", role: "İlge Aİ" }
                  ]).map((item, idx) => (
                    <div key={idx} className="card p-5 group hover:bg-[#7C3AED]/5 transition-all hover:-translate-y-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#7C3AED]/10 flex items-center justify-center flex-shrink-0 border border-[#7C3AED]/20 group-hover:bg-[#7C3AED]/20 transition-colors">
                          <span className="text-[#A78BFA] font-bold">★</span>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-1 group-hover:text-[#A78BFA] transition-colors">{item.title}</h4>
                          <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded-full border border-[#7C3AED]/30 bg-[#7C3AED]/10 text-[#A78BFA]">
                            {item.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
