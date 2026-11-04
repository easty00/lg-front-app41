'use client';
import { useState } from "react";
import { Eye, EyeOff, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import ErrorMessage from "../atoms/ErrorMessage";

export default function FormField({
  id,
  name,
  type,
  placeholder,
  value,
  defaultValue = "",
  error,
  invalid = false,
  icon,
  isClearable,
  required = true,
  autoComplete,
  form,
  onChange,
}: {
  id: string;
  name: string;
  type: "text" | "password" | "email";
  placeholder: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  invalid?: boolean;
  icon?: React.ReactNode;
  isClearable?: boolean;
  required?: boolean;
  autoComplete?: string;
  form?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const errorId = `${id}-error`;
  const [isVisible, setIsVisible] = useState(false);
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const currentValue = isControlled ? value : uncontrolledValue;
  const showClear = Boolean(isClearable && currentValue);
  const showToggle = type === "password";
  const inputType = showToggle && isVisible ? "text" : type;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setUncontrolledValue(event.target.value);
    onChange?.(event);
  };

  const handleClear = () => {
    if (!isControlled) setUncontrolledValue("");
    onChange?.({
      target: { name, value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="flex flex-col gap-1 full:gap-1.5">
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute top-1/2 left-3.5 hidden -translate-y-1/2 text-sea-muted card:block" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <Input
          id={id}
          type={inputType}
          name={name}
          form={form}
          placeholder={placeholder}
          value={currentValue}
          required={required}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error) || invalid}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-13 rounded-[10px] border-sea-line bg-white px-3.5 text-sm text-sea-ink placeholder:text-sea-muted aria-invalid:border-sea-error md:text-sm card:bg-sea-field full:h-15 full:text-base",
            icon ? "card:pl-11" : undefined,
            showClear && showToggle ? "pr-19" : showClear || showToggle ? "pr-11" : undefined,
          )}
          onChange={handleChange}
        />
        {showToggle ? (
          <button
            type="button"
            aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
            aria-pressed={isVisible}
            className="absolute top-1/2 right-1 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-sea-muted hover:text-sea-ink"
            onClick={() => setIsVisible((current) => !current)}
          >
            {isVisible ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        ) : null}
        {showClear ? (
          <button
            type="button"
            aria-label={`${placeholder} 입력 지우기`}
            className={`absolute top-1/2 inline-flex size-9 -translate-y-1/2 items-center justify-center rounded-md text-sea-muted hover:text-sea-ink ${showToggle ? "right-9" : "right-1"}`}
            onClick={handleClear}
          >
            <X className="size-4" />
          </button>
        ) : null}
      </div>
      <ErrorMessage id={errorId} error={error} />
    </div>
  );
}
