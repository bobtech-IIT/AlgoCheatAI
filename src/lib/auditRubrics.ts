export type ContentType = "text" | "image" | "article";

export const RUBRICS: Record<ContentType, { label: string }> = {
  text: {
    label: "Text Post",
  },
  image: {
    label: "Text + Image Post",
  },
  article: {
    label: "Article",
  },
};
