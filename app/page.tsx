import { AboutSection } from "@/components/layout/sections/about";
import { ContactSection } from "@/components/layout/sections/contact";
import { DomainsSection } from "@/components/layout/sections/domains";
import { EventsSection } from "@/components/layout/sections/events";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ProjectsSection } from "@/components/layout/sections/projects";
import { TeamSection } from "@/components/layout/sections/team";

export const metadata = {
  title: "P-Club, UIET",
  description: "Programming club, UIET chandigarh, Panjab University",
  openGraph: {
    type: "website",
    url: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      {
        url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
        width: 1200,
        height: 630,
        alt: "Shadcn - Landing template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "https://github.com/nobruf/shadcn-landing-page.git",
    title: "Shadcn - Landing template",
    description: "Free Shadcn landing page for developers",
    images: [
      "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
    ],
  },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <DomainsSection />
      <TeamSection />
      <ProjectsSection />
      <EventsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
