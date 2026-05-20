import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-action";

export const { GET, POST } = toNextJsHandler(auth);