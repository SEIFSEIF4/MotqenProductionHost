// app/not-found.tsx
import { redirect } from "next/navigation";

export default function NotFound() {
  // Redirect to the root route
  redirect("/ar");
}
