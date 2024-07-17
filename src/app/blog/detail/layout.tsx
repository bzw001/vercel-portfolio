import "./theme.css"

export default function layout ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="md">
            <div className="md-body">
              {children}
            </div>
      </div>
    );
  }