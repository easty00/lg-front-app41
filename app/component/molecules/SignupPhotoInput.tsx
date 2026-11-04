"use client";

import { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ErrorMessage from "../atoms/ErrorMessage";

const IMAGE_TYPES = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export default function SignupPhotoInput({ error }: { error?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState("");
  const [localError, setLocalError] = useState("");
  const [hideServerError, setHideServerError] = useState(false);
  const [serverError, setServerError] = useState(error);
  const [blocked, setBlocked] = useState<"" | "type" | "size">("");

  if (error !== serverError) {
    setServerError(error);
    setHideServerError(false);
  }

  useEffect(() => {
    return () => {
      if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const replacePreview = (next: string) => {
    if (preview.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(next);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHideServerError(true);
    const file = event.target.files?.[0];
    if (!file) {
      replacePreview("");
      setBlocked("");
      setLocalError("");
      return;
    }
    if (!IMAGE_TYPES.includes(file.type)) {
      event.target.value = "";
      replacePreview("");
      setBlocked("type");
      setLocalError("PNG, JPEG, GIF, WEBP 이미지만 등록할 수 있습니다.");
      return;
    }
    if (file.size > 500 * 1024) {
      event.target.value = "";
      replacePreview("");
      setBlocked("size");
      setLocalError("프로필 사진은 500KB 이하로 등록해 주세요.");
      return;
    }
    setBlocked("");
    setLocalError("");
    replacePreview(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    if (inputRef.current) inputRef.current.value = "";
    replacePreview("");
    setBlocked("");
    setLocalError("");
    setHideServerError(true);
  };

  const message = hideServerError ? localError : error || localError;

  return (
    <div className="flex flex-col items-center gap-3">
      <input type="hidden" name="profileImageBlocked" value={blocked} />
      <div className="flex size-28 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-sea-line bg-white text-sea-deep full:size-40">
        {preview ? (
          <img src={preview} alt="선택한 프로필 사진 미리보기" className="size-full object-cover" />
        ) : (
          <Camera className="size-9" aria-hidden="true" />
        )}
      </div>
      <Input
        ref={inputRef}
        id="profileImage"
        name="profileImage"
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        aria-invalid={Boolean(message)}
        aria-describedby={message ? "profileImage-error" : undefined}
        className="peer sr-only"
        onChange={handleChange}
      />
      <div className="flex items-center gap-2 peer-focus-visible:[&>label]:ring-3">
        <label
          htmlFor="profileImage"
          className="inline-flex h-11 cursor-pointer items-center rounded-[10px] border border-sea-line bg-white px-4.5 text-sm font-medium text-sea-ink"
        >
          <span className="sr-only">프로필 사진 </span>사진 선택
        </label>
        {preview ? (
          <Button type="button" variant="ghost" className="h-11 text-sea-ink" onClick={clearPhoto}>
            사진 지우기
          </Button>
        ) : null}
      </div>
      <p className="text-center text-[13px]/relaxed text-sea-ink card:text-sea-muted">500KB 이하의 PNG, JPEG, GIF, WEBP</p>
      <ErrorMessage id="profileImage-error" error={message} className="text-center" />
    </div>
  );
}
