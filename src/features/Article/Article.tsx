import React from "react";
import BasePageLayout from "../shared/components/BasePageLayout/BasePageLayout";
import HeadingDecorated from "../shared/components/HeadingDecorated/HeadingDecorated";
import Paragraph from "./components/Paragraph";

const Article: React.FC = () => {
  return (
    <BasePageLayout
      className="py-20 px-24 flex flex-col gap-20 items-center"
      mediaType="image"
      mediaSrc="/ArticlePageMaterials/articleHero.png"
      isScreenHeight={false}
    >
      <div className="flex flex-col items-center text-center gap-4">
        <HeadingDecorated className="font-satoshi text-text-default text-[12px] leading-[190%] tracking-[1px]">
          24TH AUG 2023
        </HeadingDecorated>
        <div className="uppercase font-forum text-text-default text-[64px] leading-[110%] tracking-[1px]">
          How Qitchen Redefines Flavor Harmony in Every Bite
        </div>
        <img src="/ArticlePageMaterials/decor.png" />
      </div>
      <div className="w-full h-full flex flex-col gap-12">
        <Paragraph header="Unveiling Culinary Artistry: A Journey into Qitchen's Soul">
          In a world where dining experiences often blend into the ordinary,
          Qitchen stands as an emblem of culinary passion redefined. Beyond
          being a restaurant that serves sushi, Qitchen is an embodiment of
          dedication, creativity, and a profound love for the art of gastronomy.
          As you step through its doors, you're not merely entering an eatery;
          you're immersing yourself in an experience that goes beyond the
          boundaries of a traditional dining encounter.
        </Paragraph>
        <Paragraph header="Crafting a Feast for the Senses">
          The heart of Qitchen's allure lies in its meticulous attention to
          every detail, from the selection of ingredients to the presentation of
          each dish. While renowned for its exceptional sushi, Qitchen's passion
          for perfection extends to every facet of the culinary journey. The
          talented chefs curate a symphony of flavors, seamlessly blending
          textures, colors, and aromas to create a multisensory masterpiece. The
          ambiance itself speaks of a story where modern elegance meets warmth,
          inviting patrons to relish not only the food but also the atmosphere
          that envelopes them. Each dish that graces the table is not just a
          meal; it's a tale told through taste—a testament to the tireless
          commitment Qitchen has toward crafting an experience that resonates
          with food enthusiasts and connoisseurs alike.
        </Paragraph>
        <Paragraph header="Beyond Sushi: Nurturing Connections">
          While the gastronomic delights are undoubtedly the centerpiece,
          Qitchen goes beyond being a culinary haven. It's a place that fosters
          connections, where conversations flow as smoothly as the sake, and
          moments turn into cherished memories. The passionate team at Qitchen
          believes that dining is an act of bonding—a chance to share joy,
          laughter, and stories over a beautifully laid table. The Qitchen
          experience transcends the physical walls of the restaurant. It's an
          invitation to step out of the ordinary and into a world where passion
          for food is an art, and every guest is a cherished canvas. Through the
          symphony of flavors, the artistry of presentation, and the warmth of
          connection, Qitchen invites you to witness passion personified in
          every aspect of your dining journey.
        </Paragraph>
      </div>
    </BasePageLayout>
  );
};

export default Article;
