import { GET_ARTICLES_QUERY } from "../../graphql/blog/queries/getArticles.query";
import type { GetArticlesQuery } from "../../graphql/codegen/generated/graphql";
import seoImage from "././../../assets/BlogPageMaterials/blogHero.avif";
import { Metadata } from "next";
import { fetchGraphQL } from "@/shared/api/fetch-graphql";
import BlogContent from "./components/BlogContent/BlogContent";

export const metadata: Metadata = {
  title: "Our Journal — Stories from the Kitchen",
  description:
    "Dive into the world of Japanese cuisine. Read about sushi traditions, our chef's secrets, and the latest news from Qitchen.",
  openGraph: {
    images: {
      url: seoImage.src,
      width: seoImage.width,
      height: seoImage.height,
      alt: "SRS Reservation",
    },
  },
};

export default async function Blog() {
  let articles: GetArticlesQuery["articles"] = [];
  let error = null;

  try {
    const data = await fetchGraphQL<GetArticlesQuery>(
      GET_ARTICLES_QUERY,
      {},
      ["menu-data"],
      "force-cache"
    );
    articles = data.articles || [];
  } catch (err: any) {
    error = err.message;
  }

  return <BlogContent initialArticles={articles} initialError={error} />;
}
