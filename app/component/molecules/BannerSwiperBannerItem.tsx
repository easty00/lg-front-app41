import Image from "next/image";
import CustomTitle from "../atoms/CustomTitle";

export default function BannerSwiperBannerItem() {
    return(
        <div id="swiper-item">  
            {/** Swiper Item : 섹션은 이미 있으니 섹션안에 들어갈 div로 만듬 */}
            <Image 
                src="/banner_beach.png"
                alt="banner"
                width={1671}
                height={941}
            />
            <CustomTitle 
                TitleType="h3"  
                className="text-red-500"
            >Cat Banner Title</CustomTitle>
            <p>Chat Banner Description</p>
            <button>View More</button>
        </div>
    );
}