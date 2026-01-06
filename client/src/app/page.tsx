import { Metadata } from "next";
import HomeClient from "./home/components/HomeContent/HomeContent";

export const metadata: Metadata = {
  title: "Sushi Sensation | Home",
  description: "Best sushi in town",
};

const Home: React.FC = () => {
  return <HomeClient />;
};

export default Home;
