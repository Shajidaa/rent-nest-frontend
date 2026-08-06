/* eslint-disable @typescript-eslint/no-explicit-any */
import { Users, UserCheck, UserX, Shield } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { StatsCard } from "../_component/statsCard";
import { StatusBadge } from "../_component/statusBage";
import { Pagination } from "../_component/pagination";
import { getUsers, toggleUserStatus } from "../_actions/adminAction";
import { UserSearch } from "../_component/user/user-search";
import { UserActions } from "../_component/user/user-actions";


export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = Number(params?.limit) || 10;
  const search = params?.search || "";

  const res = await getUsers(page, limit, search);
  // const users = res?.data || [];
  const meta = res?.meta || { page: 1, limit: 10, total: 0, totalPages: 0 };

  const totalUsers = meta.total;
  const users = JSON.parse(JSON.stringify(res?.data || []));
  const activeUsers = users.filter((u: any) => u.status === "ACTIVE").length;
  const adminUsers = users.filter((u: any) => u.role === "ADMIN").length;
// console.log(users);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={totalUsers}
          subtitle="All registered accounts"
          icon={Users}
          variant="primary"
        />
        <StatsCard
          title="Active Users"
          value={activeUsers}
          subtitle={`of ${users.length} on page`}
          icon={UserCheck}
          variant="success"
        />
        <StatsCard
          title="Admins"
          value={adminUsers}
          subtitle={`of ${users.length} on page`}
          icon={Shield}
          variant="warning"
        />
        <StatsCard
          title="Inactive/Banned"
          value={users.length - activeUsers}
          subtitle={`of ${users.length} on page`}
          icon={UserX}
          variant="danger"
        />
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        {/* Table Header & Search Bar */}
        <div className="p-5 border-b border-border/50 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-foreground">All Users</h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Manage user roles, statuses, and account access.
            </p>
          </div>
          <UserSearch />
        </div>

        {/* User Data Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50 hover:bg-transparent">
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 pl-5">
                  User
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Email
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Role
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Status
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                  Joined
                </TableHead>
                <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 text-right pr-5">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Users className="h-8 w-8 text-muted-foreground/40" />
                      <p className="text-sm">No users match your criteria.</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user: any) => (
                  <TableRow
                    key={user.id}
                    className="border-border/30 transition-colors hover:bg-accent/30"
                  >
                    <TableCell className="pl-5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.profilePhoto || ""}
                            alt={user.name}
                          />
                          <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                            {user.name
                              ? user.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")
                                  .toUpperCase()
                              : "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm text-foreground">
                          {user.name || "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.role} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                          <TableCell>
                      <StatusBadge status={user.id} />
                    </TableCell>
                 <TableCell className="text-right pr-5">
  <form
    action={async () => {
      "use server";
      await toggleUserStatus(
        user.id,
        user.status || user.activeStatus || "ACTIVE"
      );
    }}
  >
    <button
      type="submit"
      className={`px-3 py-1 text-xs font-medium rounded-md border transition-colors ${
        (user.status || user.activeStatus) === "BANNED"
          ? "border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10"
          : "border-destructive/30 text-destructive hover:bg-destructive/10"
      }`}
    >
      {(user.status || user.activeStatus) === "BANNED" ? "Unban" : "Ban"}
    </button>
  </form>
</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer Pagination */}
        <div className="p-5 border-t border-border/50">
          <Pagination
            currentPage={meta.page}
            totalPages={meta.totalPages}
            total={meta.total}
            limit={meta.limit}
          />
        </div>
      </div>
    </div>
  );
}