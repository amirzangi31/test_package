import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
      ["flex", "items-center", "justify-center", "transition-colors", "outline-none", "", "shadow-lg", "transition-all", "duration-500"],
      {
            variants: {
                  variant: {
                        primary: ["bg-red-900", "rounded-full", "text-white", "hover:bg-white", "hover:text-red-900", "hover:border", "hover:border-red-900"],
                        outlined: ["border", "border-red-900", "bg-transparent", "rounded-full", "hover:bg-red-900", "hover:text-white", "text-red-900"],
                        secondary: ["bg-green-700", "rounded-full", "text-white", "hover:bg-white", "hover:text-green-700", "hover:border", "hover:border-green-700"]
                  },
                  size: {
                        default: ["", "w-20", "h-auto", "p-2"],
                        button: ["", "h-10", "w-32"],
                        icon: ["", "w-20", "h-20", "p-2.5"],
                  },

            },

            defaultVariants: {
                  variant: "primary",
                  size: "default",
            },
      }
);

export type buttonType = VariantProps<typeof buttonStyles> & ComponentProps<"button"> & {
      classname?: string,
      handler?: () => void
      isLoading?: boolean
      isDisabled?: boolean
      children: ReactNode
};

const Button = ({ variant, size, children, handler, isDisabled, isLoading, className, ...props }: buttonType) => {

      return (
            <button
                  {...props}
                  disabled={isDisabled}
                  onClick={handler}
                  className={twMerge(buttonStyles({ variant, size }), className)}
            >
                  {isLoading ? "loading.." : children}
            </button>
      );
};

export default Button;