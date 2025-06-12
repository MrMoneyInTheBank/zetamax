interface ToolTipWrapperProps {
  className?: string;
  children: React.ReactNode;
  text: string;
}
export const ToolTipWrapper = ({
  className,
  children,
  text,
}: ToolTipWrapperProps) => {
  return (
    <div className={`relative group flex ${className}`}>
      {children}

      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
};
