import { Suspense } from "react";
import ProductContent from "@/app/component/templates/ProductContent";

export default function ProductPage({
    params,
}: {
    params: Promise<{ productCategoryName: string[] }>
}) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <ProductContent params={params} />
        </Suspense>
    );
}