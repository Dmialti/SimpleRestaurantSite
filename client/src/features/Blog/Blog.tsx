import React from "react";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import Article from "./components/ArticleCard/ArticleCard";
import CardContextProvider from "../shared/context/CardContext/CardContextProvider";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";

const Blog: React.FC = () => {
  return (
    <BasePageLayout
      className="py-20 px-24 flex flex-col gap-20 items-center"
      heading={["BLOG"]}
      mediaType="image"
      mediaSrc="/BlogPageMaterials/blogHero.png"
      isScreenHeight={false}
    >
      <HeadingDecorated className="font-forum text-text-default text-[40px] leading-[120%] tracking-[1px]">
        BEHIND THE SCENE
        <br />& LATEST NEWS
      </HeadingDecorated>
      <div className="flex flex-col gap-12">
        <CardContextProvider>
          <Article
            date="24TH AUG 2023"
            header="How Qitchen Redefines Flavor Harmony in Every Bite"
            description="Experience an orchestra of tastes as Qitchen's sushi unveils a symphony of perfectly balanced flavors."
            imageSrc="/BlogPageMaterials/articles/Image1.png"
          />
        </CardContextProvider>
        <CardContextProvider>
          <Article
            date="24TH AUG 2023"
            header="Unveiling the Mastery Behind Our Culinary Craftsmanship"
            description="Explore the meticulous artistry and dedication that create Qitchen's renowned sushi perfection."
            imageSrc="/BlogPageMaterials/articles/Image2.png"
          />
        </CardContextProvider>
        <CardContextProvider>
          <Article
            date="24TH AUG 2023"
            header="Journey through Freshness Exquisite Sushi Selection"
            description="Embark on a seafood adventure, guided by Qitchen's fresh and exquisite sushi creations from the sea."
            imageSrc="/BlogPageMaterials/articles/Image3.png"
          />
        </CardContextProvider>
        <CardContextProvider>
          <Article
            date="24TH AUG 2023"
            header="Palate with Qitchen's Unsurpassed Sushi Delicacies"
            description="Discover the heights of gastronomic delight as Qitchen's sushi transports you to a new culinary realm."
            imageSrc="/BlogPageMaterials/articles/Image4.png"
          />
        </CardContextProvider>
        <CardContextProvider>
          <Article
            date="24TH AUG 2023"
            header="The Qitchen Experience Beyond Sushi"
            description="Immerse in Qitchen's passion for culinary excellence, where sushi is more than a dish—it's an experience."
            imageSrc="/BlogPageMaterials/articles/Image5.png"
          />
        </CardContextProvider>
      </div>
    </BasePageLayout>
  );
};

export default Blog;
