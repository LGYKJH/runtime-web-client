import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LeftBar from "./_components/LeftBar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <LeftBar />
      {children}
    </SidebarProvider>
  );
}
