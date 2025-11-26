import { redirect } from "next/navigation";

export default function Home() {
  // redirect to the applications dashboard
  redirect('/applications');
}
