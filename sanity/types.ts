export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any;
  coverImage?: {
    asset: {
      url: string;
    };
  };
};