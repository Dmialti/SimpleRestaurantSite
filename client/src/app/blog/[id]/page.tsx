import { Metadata, ResolvingMetadata } from "next";
import ArticleContent from "./components/ArticleContent/ArticleContent";
import { fetchGraphQL } from "@/shared/api/fetch-graphql";
import { GET_ARTICLE_QUERY } from "@/graphql/article/queries/getArticle.query";
import { GetArticleQuery } from "@/graphql/codegen/generated/graphql";

type ArticleProps = {
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
};

async function getArticleData(id: number) {
  try {
    const data = await fetchGraphQL<GetArticleQuery>(
      GET_ARTICLE_QUERY,
      { id },
      ["blog-data", `article-${id}`],
      "force-cache"
    );
    return data.article;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata(
  { params }: ArticleProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const numericId = Number(id);

  const article = await getArticleData(numericId);

  if (!article) {
    return {
      title: "Article Not Found - SRS",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${article.name} — Stories from the Kitchen`,
    description: article.description || "Read about sushi traditions...",
    openGraph: {
      title: article.name,
      description: article.description,
      images: [
        {
          url: article.imageSrc,
          width: 800,
          height: 600,
          alt: article.name,
        },
        ...previousImages,
      ],
    },
  };
}

export default async function Article({ params }: ArticleProps) {
  const { id } = await params;
  const numericId = Number(id);

  const article = await getArticleData(numericId);

  return <ArticleContent article={article} />;
}
