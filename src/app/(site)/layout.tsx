import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import prisma from "@/lib/prisma";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personalInfo = await prisma.personalInfo.findFirst({
    include: { socialLinks: { orderBy: { order: "asc" } } },
  });
  const plain = personalInfo ? JSON.parse(JSON.stringify(personalInfo)) : null;

  return (
    <>
      <Navbar personalInfo={plain} />
      {children}
      <Footer personalInfo={plain} />
    </>
  );
}
