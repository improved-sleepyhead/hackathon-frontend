import { Devs } from "@/widgets/marketing/devs";
import { Footer } from "@/widgets/marketing/footer";
import { Galary } from "@/widgets/marketing/galary";
import { Header } from "@/widgets/marketing/header";
import { Music } from "@/widgets/marketing/music";
import { Soldier } from "@/widgets/marketing/soldier";
import { WhiteBlock } from "@/widgets/marketing/white-block";
import Image from "next/image";

const MarketingPage = () => {
  return (
    <div className="flex flex-col items-center w-full bg-orange-main">
      <Soldier />
      <WhiteBlock />
      <Galary />
      <Music />
      <Devs />
      <Footer />
    </div>
  );
};

 
export default MarketingPage;