import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { routes } from "@/lib/routes";

const STORAGE_KEY = "currentUser";

export interface CurrentUser {
  userId: string;
}

export function useRequireCurrentUser(): CurrentUser | null {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const savedUser = readSavedUser();
    if (savedUser === null) {
      router.replace(routes.login);
    } else {
      setCurrentUser(savedUser);
    }
  }, [router]);

  return currentUser;
}

function readSavedUser(): CurrentUser | null {
  const savedText = window.localStorage.getItem(STORAGE_KEY);
  if (savedText === null) {
    return null;
  }

  try {
    const savedUser = JSON.parse(savedText);
    if (typeof savedUser.userId === "string") {
      return savedUser;
    }
    return null;
  } catch {
    return null;
  }
}
