import { ReactNode } from "react";

// export types

export interface ExportContextType {
  exportToEmail: () => void;
  exportToPdf: () => void;
  exportToTxt: () => void;
}

export interface ExportProviderProps {
  children: ReactNode
}