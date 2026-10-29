// import CustomTitle from "../component/atoms/CostomTitle";
import Header from "../component/templates/Header";

export default function MeinLayout(
    {children}: {children: React.ReactNode}){
    return (
        <>
        {/* <CustomTitle TitleType="h1" className="text-amber-100">Hello, World!</CustomTitle> */}
        <Header />
        {/* todo: header */ }
        {children}
        {/* todo: footer */ }
        </>
    );
}
