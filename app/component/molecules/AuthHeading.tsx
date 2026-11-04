import { cn } from "@/lib/utils";
import CustomTitle from "../atoms/CustomTitle";

const TITLE_SIZE = {
  h1: "card:text-4xl/[1.15] wide:text-[40px]/[1.15] full:text-[56px]/[1.15]",
  h2: "card:text-[28px]/[1.15] wide:text-[34px]/[1.15] full:text-[40px]/[1.15]",
};

export default function AuthHeading({
  TitleType,
  title,
  description,
  titleClassName,
  descriptionClassName,
}: {
  TitleType: "h1" | "h2";
  title: string;
  description: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-center card:text-left">
      <CustomTitle
        TitleType={TitleType}
        className={cn(
          "auth-title text-[30px]/[1.15] font-normal text-balance break-keep text-sea-ink card:text-left card:text-sea-deep",
          TITLE_SIZE[TitleType],
          titleClassName,
        )}
      >
        {title}
      </CustomTitle>
      <p className={cn("text-sm/relaxed break-keep text-sea-ink card:text-sea-muted full:text-[17px]/relaxed", descriptionClassName)}>
        {description}
      </p>
    </div>
  );
}
