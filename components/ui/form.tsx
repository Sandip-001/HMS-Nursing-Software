"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import {
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@/lib/utils";

const Form = FormProvider;

const FormField = Controller;

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error } = useFormContext() as any;

  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = ({ ...props }: any) => {
  return <div {...props} />;
};

const FormMessage = ({ children }: any) => {
  return children ? (
    <p className="text-sm text-red-500">{children}</p>
  ) : null;
};

export {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
};