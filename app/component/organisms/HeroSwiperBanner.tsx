import BannerSwiperItem from "../molecules/BannerSwipperBannerItem";

export default function HeroSwiperBanner() {
    return(
        <div id="swiper">  
            {/** Swiper Items : 섹션은 이미 있으니 섹션안에 들어갈 div로 만듬 */}
            <BannerSwiperItem />
            <BannerSwiperItem />
            <BannerSwiperItem />
        </div>
    );
}
