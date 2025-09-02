import type { IconType } from "react-icons";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  children?: React.ReactNode;
  completed?: boolean;
  tooltip?: string;
}

const IconButton = ({
  icon: Icon,
  children,
  className = "",
  disabled,
  completed,
  tooltip,
  ...props
}: IconButtonProps) => {
  return (
    <Tippy content={tooltip} disabled={!tooltip} placement="top">
      <button
        className={`flex items-center justify-center p-2 rounded-md  ${className} ${
          disabled
            ? "opacity-25 cursor-default pointer-events-auto"
            : "hover-theme cursor-pointer"
        }`}
        {...props}
      >
        <Icon
          size={18}
          className={`inline align-middle ${
            completed ? "completed" : "icon-theme"
          }`}
        />
        {children}
      </button>
    </Tippy>
  );
};

export default IconButton;
