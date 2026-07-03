"use client";

import { useSiteData } from "@/lib/siteData";

export default function Footer() {
  const { data: d } = useSiteData();
  if (!d) return null;

  return (
    <footer className="relative border-t border-[#1E1E2A] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <a href="#" className="text-lg font-bold text-white tracking-tight">
              Enis Talha Sünetci<span className="text-[#A78BFA]">.</span>
            </a>
            <p className="text-sm text-[#9090A8] mt-3 leading-relaxed max-w-xs">
              Havacılık, savunma ve yapay zeka kesişiminde projeler yönetiyor, takımlar kuruyorum.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-semibold text-[#4A4A60] uppercase tracking-widest mb-4">Hızlı Linkler</p>
            <div className="space-y-2">
              {[
                { label: "Hakkımda", href: "#about" },
                { label: "Deneyimler", href: "#experience" },
                { label: "Projeler", href: "/projects/" },
                { label: "Yetenekler", href: "#skills" },
                { label: "İletişim", href: "#contact" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="block text-sm text-[#9090A8] hover:text-white transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <p className="text-xs font-semibold text-[#4A4A60] uppercase tracking-widest mb-4">Sosyal Medya</p>
            <div className="space-y-2">
              {d.contact.showLinkedin !== false && d.contact.linkedin && (
                <a href={d.contact.linkedin} target="_blank" rel="noopener noreferrer" className="block text-sm text-[#9090A8] hover:text-white transition-colors">
                  LinkedIn
                </a>
              )}
              {d.contact.showInstagram !== false && d.contact.instagram && (
                <a href={d.contact.instagram} target="_blank" rel="noopener noreferrer" className="block text-sm text-[#9090A8] hover:text-white transition-colors">
                  Instagram
                </a>
              )}
              {d.contact.showGithub !== false && d.contact.github && (
                <a href={d.contact.github} target="_blank" rel="noopener noreferrer" className="block text-sm text-[#9090A8] hover:text-white transition-colors">
                  GitHub
                </a>
              )}
              {d.contact.showEmail !== false && d.contact.email && (
                <a href={`mailto:${d.contact.email}`} className="block text-sm text-[#9090A8] hover:text-white transition-colors">
                  {d.contact.email}
                </a>
              )}
            </div>
          </div>
        </div>
 
        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[#1E1E2A] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#4A4A60]">
            © {new Date().getFullYear()} Enis Talha Sünetci {d.contact.showLocation !== false && d.contact.location ? `· ${d.contact.location}` : ""}
          </div>
          <div className="text-xs text-[#4A4A60]">
            Made with 💜
          </div>
        </div>
      </div>
    </footer>
  );
}
