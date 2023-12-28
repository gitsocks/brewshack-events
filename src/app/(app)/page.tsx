import { AuthGuard } from "@/components/guards/AuthGuard";
import { getUserFromServer } from "@/services/server/get-user-from-server";
import { fetchAuthDetails } from "@/utils/fetch-auth-details";

export default async function Home() {
  const authState = await fetchAuthDetails();

  console.log(authState);

  let loggedInPath = '';

  if (authState) {
    const currentUser = await getUserFromServer(authState.id);

    if (currentUser.applications && currentUser.applications?.length > 0) {
      loggedInPath = `/apps/${currentUser.applications[0].id}`;
    } else {
      loggedInPath = '/apps/create';
    }
  }

  return <AuthGuard user={authState} isLoggedInPath={loggedInPath} />;
}
