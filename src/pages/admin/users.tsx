import { useEffect, useState } from "react";
import SharedLayout from "@/components/layout/SharedLayout";
import ErrorMessage from "@/components/ui/ErrorMessage";
import UserCard from "@/components/users/UserCard";
import { useRequireCurrentUser } from "@/hooks/useRequireCurrentUser";
import { fetchAllUsers } from "@/lib/api/users";
import { getErrorMessage } from "@/lib/getErrorMessage";
import type { User } from "@/types/models";

export default function AllUsersPage() {
  const currentUser = useRequireCurrentUser();
  const userId = currentUser?.userId;

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!userId) {
      return;
    }

    async function loadUsers() {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const fetchedUsers = await fetchAllUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [userId]);

  if (!currentUser) {
    return null;
  }

  const visibleUsers = users.filter((user) => user.fullName.toLowerCase().includes(searchText.trim().toLowerCase()));

  return (
    <SharedLayout pageTitle="All users" onSearchChange={setSearchText}>
      {isLoading && <p className="text-sm text-gray-500">Loading users...</p>}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {!isLoading && !errorMessage && visibleUsers.length === 0 && (
        <p className="text-sm text-gray-500">No users found.</p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleUsers.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </SharedLayout>
  );
}
