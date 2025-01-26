import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  //eslint-disable-next-line
  startIcon?: any;
  //eslint-disable-next-line
  endIcon?: any;
  originalType?: string;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      startIcon,
      endIcon,
      setShowPassword,
      originalType,
      showPassword,
      ...props
    },
    ref
  ) => {
    const StartIcon = startIcon ? startIcon : null;
    const EndIcon = endIcon;

    return (
      <div className="w-full relative">
        <input
          type={type}
          className={cn(
            "peer flex h-11 w-full rounded-md border border-input bg-background py-2 px-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            startIcon ? "pl-9" : "",
            endIcon ? "pr-9" : "",
            className
          )}
          ref={ref}
          {...props}
        />
        {StartIcon && (
          <StartIcon className="ml-1 absolute left-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4" />
        )}
        {endIcon && (
          <EndIcon
            className={`mr-1 absolute right-1.5 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
              originalType === "password" && setShowPassword && "cursor-pointer"
            }`}
            onClick={() => {
              if (setShowPassword && originalType === "password") {
                setShowPassword(!showPassword);
              }
            }}
          />
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
