import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ScreenSizeWarningProps {
  title?: string;
  description?: string;
  className?: string;
}

export function ScreenSizeWarning({
  title = "Screen too small",
  description = "Please use a device with a larger screen for the best experience.",
  className = "",
}: ScreenSizeWarningProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4 ${className}`}
    >
      <Alert variant="destructive" className="max-w-md">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
