"use client";
import React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cva, cx } from "cva";

const avatarStyles = cva(
  ["relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"],
  {
    variants: {
      size: {
        small: "w-[30px] h-[30px]",
        medium: "w-[40px] h-[40px]",
        large: "w-[50px] h-[50px]",
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

type AvatarProps = {
  size?: "small" | "medium" | "large";
};

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & AvatarProps
>(({ className, size, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={avatarStyles({ className, size })}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cx("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cx(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback, type AvatarProps };
