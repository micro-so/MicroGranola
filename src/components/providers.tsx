"use client";

import type { ReactNode } from "react";
import { DataSourceProvider, type DataSource } from "@/lib/data-source";

export function Providers({ children, workspaceName, defaultSource }: {
  children: ReactNode;
  workspaceName: string;
  defaultSource: DataSource;
}) {
  return (
    <DataSourceProvider workspaceName={workspaceName} defaultSource={defaultSource}>
      {children}
    </DataSourceProvider>
  );
}
