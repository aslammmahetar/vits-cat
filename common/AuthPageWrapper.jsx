import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyJwtEdge } from "../lib/auth";

export default async function AuthPageWrapper({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME)?.value;
  if (token) {
    const payload = await verifyJwtEdge(token);
    if (payload?.slug) {
      redirect(`/${payload.slug}/admin`);
    }
  }
  return <>{children}</>;
}
