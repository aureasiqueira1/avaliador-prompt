import { cn } from "@/lib/utils";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeTab: string;
}

export function Tabs({
  activeTab,
  setActiveTab,
  children,
  className,
}: TabsProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

export function TabsTrigger({
  value,
  children,
  className,
  activeTab,
  setActiveTab,
}: TabsTriggerProps) {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        activeTab === value
          ? "bg-white text-blue-600 shadow-sm"
          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50",
        className
      )}
    >
      {children}
    </button>
  );
}

export function TabsContent({
  value,
  children,
  className,
  activeTab,
}: TabsContentProps) {
  if (activeTab !== value) return null;

  return <div className={cn("mt-4", className)}>{children}</div>;
}
