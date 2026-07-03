"use client";

import { useEffect } from "react";
import { useSiteData } from "@/lib/siteData";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import RadarBackground from "@/components/RadarBackground";
import ScrollReveal from "@/components/ScrollReveal";

export default function EventDetailClient({ eventSlug }: { eventSlug: string }) {
  const { data, loaded } = useSiteData();
  const event = data?.events?.find((e) => e.slug === eventSlug);

  useEffect(() => {
    if (event) {
      document.title = event.seo?.title || `${event.title} / Portfolyo`;
      
      let descMeta = document.querySelector('meta[name="description"]');
      const descVal = event.seo?.description || event.description || "";
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', descVal);

      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      const keywordsVal = event.seo?.keywords || `${event.category}, ${event.org}, Enis Talha Sünetci`;
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywordsVal);
    }
  }, [event]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center text-white">
        Yükleniyor...
      </div>
    );
  }

  if (!event) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white">
      <MouseFollower />
      <RadarBackground />
      <Navbar />

      <article className="max-w-4xl mx-auto px-6 pt-32 pb-20">
        <ScrollReveal mode="fade-up">
          <Link href="/events" className="inline-flex items-center gap-2 text-[#9090A8] hover:text-white transition-colors mb-8 group">
            <span className="w-8 h-8 rounded-full bg-[#111118] border border-[#1E1E2A] flex items-center justify-center group-hover:bg-[#7C3AED]/20 group-hover:border-[#7C3AED]/40 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            Tüm Etkinliklere Dön
          </Link>

          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#7C3AED]/10 text-[#A78BFA] border border-[#7C3AED]/20">
                {event.category}
              </span>
              <span className="text-sm text-[#9090A8]">{event.date}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              {event.title}
            </h1>
            <p className="text-xl text-[#7C3AED] font-medium">{event.org}</p>
          </header>
        </ScrollReveal>

        <ScrollReveal mode="zoom-in" delay={0.2}>
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden mb-16 border border-[#1E1E2A] shadow-2xl">
            <Image
              src={event.photo}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-[2fr_1fr] gap-12">
          {/* Main Content */}
          <div className="space-y-12">
            <ScrollReveal mode="fade-up" delay={0.3}>
              <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Etkinlik Özeti</h2>
              <p className="text-[#9090A8] text-lg leading-relaxed whitespace-pre-line">
                {event.description}
              </p>
            </ScrollReveal>

            {event.details && event.details.length > 0 && (
              <ScrollReveal mode="fade-up" delay={0.4}>
                <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Rol ve Operasyon Süreci</h2>
                <div className="space-y-4">
                  {event.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-6 h-6 mt-1 rounded-full bg-[#7C3AED]/20 flex items-center justify-center text-[#A78BFA]">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <p className="text-[#9090A8] leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            )}
            
            {event.gallery && event.gallery.length > 1 && (
               <ScrollReveal mode="fade-up" delay={0.5}>
                 <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Galeri</h2>
                 <div className="grid grid-cols-2 gap-4">
                    {event.gallery.map((img, idx) => (
                      <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-[#1E1E2A]">
                         <Image src={img} alt={`Galeri ${idx}`} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                      </div>
                    ))}
                 </div>
               </ScrollReveal>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <ScrollReveal mode="slide-right" delay={0.4}>
              <div className="p-6 rounded-2xl bg-[#111118] border border-[#1E1E2A]">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Kazanımlar & Sonuç</h3>
                <ul className="space-y-3">
                  {event.achievements && event.achievements.map((ach, idx) => (
                    <li key={idx} className="text-sm text-[#9090A8] flex items-start gap-2">
                      <span className="text-[#EC4899] mt-0.5">•</span>
                      {ach}
                    </li>
                  ))}
                  {(!event.achievements || event.achievements.length === 0) && (
                    <li className="text-sm text-[#9090A8]">Etkinlik başarıyla tamamlandı.</li>
                  )}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal mode="slide-right" delay={0.5}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#7C3AED]/10 to-[#EC4899]/10 border border-[#7C3AED]/20">
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>Birlikte Çalışalım</h3>
                <p className="text-sm text-[#9090A8] mb-4">
                  Buna benzer projelerde veya organizasyonlarda iş birliği yapmak isterseniz iletişime geçebilirsiniz.
                </p>
                <a
                  href={`mailto:${data.contact.email}`}
                  className="block w-full text-center px-4 py-2.5 text-sm font-semibold text-white rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] transition-colors"
                >
                  İletişim Kur
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
