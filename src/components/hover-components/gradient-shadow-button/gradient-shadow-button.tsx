interface GradientShadowButtonProps {
  text: string;
}

const GradientShadowButton = ({ text }: GradientShadowButtonProps) => {
  return (
    <div className="group relative w-fit transition-transform duration-300 active:scale-95">
      <button className="relative z-10 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 p-0.5 duration-300 group-hover:scale-110">
        <span className="block rounded-md px-4 py-2 font-bold text-white duration-300">
          {text}
        </span>
      </button>
      <span className="pointer-events-none absolute -inset-4 z-0 transform-gpu rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-all duration-300 group-hover:opacity-90 group-active:opacity-50" />
    </div>
  );
};

export default GradientShadowButton;
