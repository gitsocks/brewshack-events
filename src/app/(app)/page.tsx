import { AuthGuard } from "@/components/guards/AuthGuard";
import { CurrentUser } from "@/database/types/current-user";
import { getUserFromServer } from "@/services/server/get-user-from-server";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";
import Link from "next/link";

export default async function Home() {
  const authState = await fetchAuthDetails();

  let currentUser: CurrentUser | undefined = undefined;

  if (authState) {
    currentUser = await getUserFromServer(authState.id);
  }

  const currentUserIsValid = () => currentUser && currentUser.applications && currentUser.applications.length > 0;

  return (
    <AuthGuard user={authState}>
      <h1>Applications</h1>
      <p>Please select an application to view its events.</p>
      <ul>
        {currentUserIsValid() && currentUser?.applications?.map(application => (
          <Link key={application.id} href={{ pathname: `/apps/${application.id}` }}>
            <li>{application.name}</li>
          </Link>
        ))}
      </ul>
    </AuthGuard>
  );
}
