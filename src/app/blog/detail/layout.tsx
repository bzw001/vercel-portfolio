import "./theme.css"
import {Card, CardBody} from "@nextui-org/react";

export default ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
    return (
        <div className="md">
            <div className="md-body">
              {children}
            </div>
      </div>
    );
  }