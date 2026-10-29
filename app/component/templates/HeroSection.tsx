import HeroSwiperBanner from "../organisms/HeroSwiperBanner";

export default function HeroSection() {

    return (
        <section>
        {/* swiper : 큰 섹션 안에 스와이퍼를 넣어 이미지가 넘어가게 할것임*/}
        <div id="swiper">
            <HeroSwiperBanner/>
        {/* moleclues items : 원자? 이미지들 */}
        {/* moleclues controls : 버튼 좌우로 넘기는 버튼 */}
        </div>
        </section>
    );
}