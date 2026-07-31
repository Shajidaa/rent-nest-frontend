import DashboardLayoutClient from "@/components/ui/shared/DashboardLayoutClient";
import { getMe } from "@/service/getMe";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();

    return (
        <DashboardLayoutClient user={user}>
            {children}
        </DashboardLayoutClient>
    );
};

export default DashboardLayout;
