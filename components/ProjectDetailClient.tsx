"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MouseFollower from "@/components/MouseFollower";
import { useSiteData } from "@/lib/siteData";
import type { ProjectDetail } from "@/lib/defaultData";

const CATEGORY_COLORS: Record<string, string> = {
  Zirve: "text-purple-400",
  Etkinlik: "text-blue-400",
  Yarışma: "text-orange-400",
  Diplomasi: "text-emerald-400",
  Gönüllülük: "text-pink-400",
  Medya: "text-cyan-400",
};

export default function ProjectDetailClient({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const { data, loaded } = useSiteData();
  const project = data?.projects?.find((p) => p.slug === projectSlug);

  useEffect(() => {
    if (project) {
      document.title = project.seo?.title || `${project.title} / Portfolyo`;
      
      let descMeta = document.querySelector('meta[name="description"]');
      const descVal = project.seo?.description || project.subtitle || (project.description && project.description[0]) || "";
      if (!descMeta) {
        descMeta = document.createElement('meta');
        descMeta.setAttribute('name', 'description');
        document.head.appendChild(descMeta);
      }
      descMeta.setAttribute('content', descVal);

      let keywordsMeta = document.querySelector('meta[name="keywords"]');
      const keywordsVal = project.seo?.keywords || project.technologies.join(', ') || "";
      if (!keywordsMeta) {
        keywordsMeta = document.createElement('meta');
        keywordsMeta.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsMeta);
      }
      keywordsMeta.setAttribute('content', keywordsVal);
    }
  }, [project]);

  if (!loaded) return (
    <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center text-white">
      Yükleniyor...
    </div>
  );

  if (!project) return notFound();

  const relatedSlugs = project.relatedSlugs || [];
  const related = data.projects.filter((p) => relatedSlugs.includes(p.slug));

  const catColor = CATEGORY_COLORS[project.category] ?? "text-slate-400";

  return (
    <main className="relative min-h-screen" style={{ background: "#0A0A0F" }}>
      <MouseFollower />
      <div className="fixed inset-0 grid-bg pointer-events-none z-0 opacity-50" />
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[#7C3AED]/8 blur-[120px] pointer-events-none z-0" />

      <Navbar />

      <div className="relative z-10">
        {/* Hero cover */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <Image
            src={project.coverPhoto}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/60 to-[#0A0A0F]/30" />

          {/* Breadcrumb overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-10">
            <div className="max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 text-sm text-[#9090A8] mb-4">
                  <Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link>
                  <span>/</span>
                  <Link href="/projects/" className="hover:text-white transition-colors">Projeler</Link>
                  <span>/</span>
                  <span className="text-white">{project.title}</span>
                </div>
                <span className={`text-xs font-medium ${catColor} uppercase tracking-widest`}>
                  {project.category} · {project.period}
                </span>
                <h1
                  className="text-3xl lg:text-5xl font-bold text-white mt-2 leading-tight"
                  style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
                >
                  {project.title}
                </h1>
                <p className="text-lg text-[#9090A8] mt-3">{project.subtitle}</p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-14"
          >
            <div className="card p-4">
              <div className="text-xs text-[#4A4A60] uppercase tracking-widest mb-1">Rol</div>
              <div className="text-sm text-white font-medium">{project.role}</div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-[#4A4A60] uppercase tracking-widest mb-1">Kurum</div>
              <div className="text-sm text-white font-medium">{project.org}</div>
            </div>
            <div className="card p-4">
              <div className="text-xs text-[#4A4A60] uppercase tracking-widest mb-1">Dönem</div>
              <div className="text-sm text-white font-medium">{project.period}</div>
            </div>
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-14"
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Proje Hakkında
            </h2>
            <div className="space-y-4 text-[#9090A8] leading-relaxed">
              {project.description.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          {project.achievements.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-14"
            >
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Başarılar & Öne Çıkanlar
              </h2>
              <div className="space-y-3">
                {project.achievements.map((a, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-[#7C3AED] mt-0.5 flex-shrink-0">✦</span>
                    <span className="text-sm text-[#9090A8]">{a}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-14"
          >
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
              Kullanılan Beceriler
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </motion.div>

          {/* PDF Download Section */}
          {project.pdfUrl && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-14"
            >
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Proje Dökümanları
              </h2>
              <div className="p-8 rounded-3xl bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 border border-[#7C3AED]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-red-500 border border-white/10 shadow-2xl">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M7 2a2 2 0 00-2 2v16a2 2 0 002 2h10a2 2 0 002-2V4a2 2 0 00-2-2H7zm0 2h10v16H7V4zm2 2v2h6V6H9zm0 4v2h6v-2H9zm0 4v2h6v-2H9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">Proje Raporu / Bitirme Çalışması</h3>
                    <p className="text-sm text-[#9090A8]">PDF dökümanını inceleyin veya indirin</p>
                  </div>
                </div>
                <a
                  href={project.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 bg-white text-[#0A0A0F] font-bold rounded-2xl hover:scale-105 transition-transform shadow-xl flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  PDF İndir
                </a>
              </div>
            </motion.div>
          )}

          {/* Gallery */}
          {project.gallery.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-14"
            >
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                Fotoğraflar
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.gallery.map((photo, i) => (
                  <div key={i} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#1E1E2A] group">
                    <Image
                      src={photo}
                      alt={`${project.title} - ${i + 1}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Related projects */}
          {related.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="divider mb-10" />
              <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}>
                İlgili Projeler
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/projects/detay?slug=${rp.slug}`}
                    className="card p-4 group hover:bg-[#7C3AED]/5"
                  >
                    <div className="relative h-32 rounded-xl overflow-hidden mb-3">
                      <Image src={rp.coverPhoto} alt={rp.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-[#A78BFA] transition-colors">{rp.title}</h3>
                    <p className="text-xs text-[#9090A8] mt-1">{rp.period}</p>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}

          {/* Back */}
          <div className="mt-14">
            <Link
              href="/projects/"
              className="inline-flex items-center gap-2 text-sm text-[#9090A8] hover:text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tüm Projeler
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}
