import { getUserAuth } from "@/lib/auth/utils";
import { revalidatePath } from "next/cache";

export async function PUT(request: Request) {
  const session = await getUserAuth();
  if (!session) return new Response("Error", { status: 400 });
  const body = (await request.json()) as { name?: string; email?: string };

  revalidatePath("/account");
  return new Response(JSON.stringify({ message: "ok" }), { status: 200 });
}
