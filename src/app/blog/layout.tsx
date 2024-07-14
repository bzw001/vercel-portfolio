import "./theme.css"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <Card className="flex items-center justify-center md">
            <div>
            {children}
            </div>
      </Card>
    );
  }