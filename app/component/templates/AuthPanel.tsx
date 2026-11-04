export default function AuthPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex flex-1 flex-col px-5 pt-13 pb-8 card:px-8 card:pt-8 card:pb-5 wide:px-[8%] wide:pt-10 wide:pb-6 full:px-[11%] full:pt-15 full:pb-9">
      <div className="mx-auto flex w-full flex-1 flex-col gap-3 card:max-w-110 card:gap-4 wide:max-w-100 full:max-w-115 full:gap-5.5">
        {children}
      </div>
    </div>
  );
}
