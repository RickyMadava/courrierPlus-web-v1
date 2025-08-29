import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access-token');
  
  console.log("[ACCESS-TOKEN]", accessToken?.value ? 'Present' : 'Missing');

  if (!accessToken?.value) {
    redirect("/login");
  }

  return { accessToken: accessToken.value };
}
