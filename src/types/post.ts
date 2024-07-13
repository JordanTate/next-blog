export type Post = {
  id: string;
  title: string;
  subtitle: string | null;
  content: string;
  image: string | null;
  alt: string | null;
  tags?: Tag[];
  published: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: string;
  name: string;
  slug: string;
};

export default interface Props {
  post?: Post;
  posts?: Post[] | [];
  setPosts?: (posts: Post[] | []) => void;
}
