import Image from "next/image";
import CustomTitle from "../atoms/CustomTitle";
import { Button } from "@/components/ui/button";

export default function BannerSwiperBannerItem() {
    return(
        <div id="swiper-item">
            <Image
                src="/banner_beach.png"
                alt="banner"
                width={1671}
                height={941}
                className="w-full h-auto"
            />
            <CustomTitle
                TitleType="h3"
                className="text-red-500"
            >Beach Banner Title</CustomTitle>
            <p>Beach Banner Description</p>
            <Button variant="default" size="lg">View More</Button>
        </div>
    );
}
