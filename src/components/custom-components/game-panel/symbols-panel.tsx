import { ToolTipWrapper } from "../tooltip-wrapper/tooltip-wrapper";
import { ComponentType } from "react";
import { Plus, Minus, X, Divide, LucideProps } from "lucide-react";

export type MathSymbol = "+" | "-" | "*" | "/";
const baseSymbolVariant = {
  style: "text-indigo-200 transition-transform hover:scale-110",
  size: 35,
};

const symbols: Record<MathSymbol, ComponentType<LucideProps>> = {
  "+": Plus,
  "-": Minus,
  "*": X,
  "/": Divide,
};

const symbolsToToggleString: Record<MathSymbol, string> = {
  "+": "Toggle addition",
  "-": "Toggle substraction",
  "*": "Toggle multiplication",
  "/": "Toggle division",
};

interface SymbolsPanelProps {
  ops: MathSymbol[];
  toggleSymbol: (sym: MathSymbol) => void;
}
export const SymbolsPanel = ({ ops, toggleSymbol }: SymbolsPanelProps) => {
  return (
    <div className="flex justify-evenly">
      {(Object.keys(symbols) as MathSymbol[]).map((op, index) => {
        const isActive = ops.includes(op);
        const Icon = symbols[op as MathSymbol];
        return (
          <div className="relative group flex" key={index}>
            <ToolTipWrapper text={symbolsToToggleString[op]}>
              <button className="relative" onClick={() => toggleSymbol(op)}>
                <Icon
                  className={`${baseSymbolVariant.style} ${isActive ? "scale-120" : "scale-75 opacity-70"}`}
                  size={baseSymbolVariant.size}
                />
              </button>
            </ToolTipWrapper>
          </div>
        );
      })}
    </div>
  );
};
