const withoutAuthUrlList = [
    "/login",
    "/signup",
];

const authUrlList = [
    "/cart",
    "/order",
];

function safeCallbackPath(value: string | null | undefined) {
    if (!value || !value.startsWith("/") || value.startsWith("//") || value. includes("\\")) return "/";
    const pathname = value.split("?")[0];
    if (withoutAuthUrlList.includes(pathname)) return "/";
    return value;
}

export { authUrlList, safeCallbackPath, withoutAuthUrlList };