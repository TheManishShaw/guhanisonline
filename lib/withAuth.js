import GlobalLoader from "@/components/ui/common/GlobalLoader";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        const callbackUrl = window.location.href; // Capture the current URL as the callback URL
        console.log(`Redirecting to sign-in with callbackUrl: ${callbackUrl}`);
        signIn(null, { callbackUrl }); // Pass the callback URL to the signIn function
      }
    }, [status]);

    useEffect(() => {
      if (status === "authenticated" && !session) {
        router.push("/sign-in"); // Redirect to sign-in page if session is expired
      }
    }, [status, session]);

    if (status === "loading") {
      return <GlobalLoader />; // Show a loading state while checking the session
    }

    if (status === "authenticated") {
      return <WrappedComponent {...props} />;
    }

    return null; // Prevent rendering if not authenticated
  };

  WithAuth.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuth;
};

const getDisplayName = (Component) =>
  Component.displayName || Component.name || "Component";

export default withAuth;
