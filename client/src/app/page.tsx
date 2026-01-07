import { Metadata } from "next";
import HomeContent from "./home/components/HomeContent/HomeContent";

export const metadata: Metadata = {
  title: "Sushi Sensation | Home",
  description: "Best sushi in town",
};

export default async function Home() {
  return <HomeContent />;
}
