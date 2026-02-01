"use client";

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background/95 group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:rounded-2xl group-[.toaster]:backdrop-blur-md group-[.toaster]:border",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:font-medium group-[.toast]:rounded-full",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground group-[.toast]:rounded-full",
          error:
            "group-[.toaster]:border-red-500/20 group-[.toaster]:bg-red-50/90 dark:group-[.toaster]:bg-red-950/20 group-[.toaster]:text-red-600 dark:group-[.toaster]:text-red-400",
          success:
            "group-[.toaster]:border-green-500/20 group-[.toaster]:bg-green-50/90 dark:group-[.toaster]:bg-green-950/20 group-[.toaster]:text-green-600 dark:group-[.toaster]:text-green-400",
          warning:
            "group-[.toaster]:border-yellow-500/20 group-[.toaster]:bg-yellow-50/90 dark:group-[.toaster]:bg-yellow-950/20 group-[.toaster]:text-yellow-600 dark:group-[.toaster]:text-yellow-400",
          info: "group-[.toaster]:border-blue-500/20 group-[.toaster]:bg-blue-50/90 dark:group-[.toaster]:bg-blue-950/20 group-[.toaster]:text-blue-600 dark:group-[.toaster]:text-blue-400",
        },
      }}
      icons={{
        success: (
          <CircleCheckIcon className="size-5 text-green-600 dark:text-green-400" />
        ),
        info: <InfoIcon className="size-5 text-blue-600 dark:text-blue-400" />,
        warning: (
          <TriangleAlertIcon className="size-5 text-yellow-600 dark:text-yellow-400" />
        ),
        error: (
          <OctagonXIcon className="size-5 text-red-600 dark:text-red-400" />
        ),
        loading: (
          <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
        ),
      }}
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "1rem", // rounded-2xl
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
