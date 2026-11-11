
import Sidebar from "../components/Sidebar";

export default function SidebarTest() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userName="Test User" isAdmin={true} />

      <main className="flex-1 p-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Training Logs Dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          This is a temporary page to test the sidebar.
        </p>
      </main>
    </div>
  );
}
