import { cookies } from "next/headers";
import CvEditor from "@components/cv/cv-editor";
import CvLogin from "@components/cv/cv-login";
import { isConfigured, SESSION_COOKIE, verifySession } from "@lib/cv-auth";
import { readPortfolio } from "@lib/portfolio-store";

export const dynamic = "force-dynamic";

export default async function CvEditPage() {
  if (!verifySession(cookies().get(SESSION_COOKIE)?.value)) {
    return <CvLogin configured={isConfigured()} />;
  }
  return <CvEditor initialData={await readPortfolio()} />;
}
