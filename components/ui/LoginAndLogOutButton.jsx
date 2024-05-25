"use server";
import { auth, signIn, signOut } from "@/auth";
import React from "react";

const LoginAndLogOutButton = async () => {
  const session = await auth();
  return (
    <div>
      {session && session.user ? (
        <>
          <p>{session.user.name}</p>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <button type="submit">Sign out</button>
          </form>
        </>
      ) : (
        <>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <button type="submit">Sign In</button>
          </form>
        </>
      )}
    </div>
  );
};

export default LoginAndLogOutButton;
