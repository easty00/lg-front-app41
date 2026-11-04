import Image from "next/image";
import { Sun } from "lucide-react";
import { authBannerImage, type AuthVisualContent } from "@/config/auth";
import { cn } from "@/lib/utils";

export default function AuthVisual({
  headline,
  description,
  imageClassName,
  dashCount,
  activeDash,
  textKey,
  textClassName,
}: AuthVisualContent & {
  textKey: number;
  textClassName: string;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden card:relative card:inset-auto card:w-[44%] card:shrink-0 wide:w-[47%]">
      <Image
        src={authBannerImage.src}
        alt=""
        fill
        preload
        sizes={authBannerImage.sizes}
        quality={authBannerImage.quality}
        className={cn("object-cover transition-[object-position] duration-700 ease-out motion-reduce:transition-none", imageClassName)}
      />
      <div className="auth-scrim absolute inset-0" />
      <p className="absolute top-6 left-6 hidden items-center gap-2 text-[13px] text-white card:flex wide:top-7 wide:left-8 full:top-11 full:left-14 full:text-[15px]">
        <Sun className="size-4" aria-hidden="true" />
        A fresh perspective
      </p>
      <div
        key={textKey}
        className={cn(
          "absolute right-6 bottom-7 left-6 hidden flex-col gap-2.5 text-white card:flex wide:right-8 wide:bottom-8 wide:left-8 full:right-14 full:bottom-14 full:left-14 full:gap-3.5",
          textClassName,
        )}
      >
        <p className="text-[11px] tracking-[0.22em] full:text-[13px]">YOUR NEXT CHAPTER</p>
        <p className="text-[26px]/[1.35] font-medium wide:text-[32px]/[1.35] full:text-[46px]/[1.35]">
          {headline[0]}
          <br />
          {headline[1]}
        </p>
        <p className="text-sm/relaxed full:text-[17px]/relaxed">{description}</p>
        <div className="mt-3 flex gap-1.5" aria-hidden="true">
          {Array.from({ length: dashCount }, (_, index) => (
            <span
              key={index}
              className={`h-0.75 rounded-full ${index === activeDash ? "w-9.5 bg-white" : "w-4 bg-white/45"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
