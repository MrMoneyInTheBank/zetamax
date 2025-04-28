interface CustomButtonProps {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export const CustomButton = ({
  top,
  bottom,
  left,
  right,
  loading,
  children,
}: CustomButtonProps) => {
  return (
    <div
      className={`fixed flex items-center justify-center rounded-xl
                     bg-gradient-to-br from-violet-600 to-violet-500
                     ${top ? `top-${top}` : ""}
                     ${bottom ? `bottom-${bottom}` : ""}
                     ${left ? `left-${left}` : ""}
                     ${right ? `right-${right}` : ""}
                     ${loading ? "animate-pulse" : ""}
                `}
    >
      <button className="relative rounded-xl bg-white/0 transition-colors hover:bg-white/20 p-1">
        {children}
      </button>
    </div>
  );
};
