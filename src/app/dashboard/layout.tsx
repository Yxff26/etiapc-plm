import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import DashboardNav from "@/components/dashboard/components/DashboardNav";
import { UserNav } from "@/components/dashboard/components/user-nav";

type UserRole = 'teacher' | 'coordinator' | 'administrator';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log('Session en layout:', session);

  if (!session?.user) {
    redirect("/auth/login");
  }

  const userRole = session.user.role as UserRole;
  console.log('UserRole en layout:', userRole);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <h2 className="text-lg font-semibold">Sistema de Evaluaciones</h2>
          </div>
          <div className="flex-1 px-3">
            <DashboardNav role={userRole} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <div className="flex h-[60px] items-center border-b px-4">
          <div className="ml-auto flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
        <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
        </main>
      </div>
    </div>
  );
} 