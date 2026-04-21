import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
//   console.log("context : ", context);
//   console.log("context.query.q : ", context.query.q);
const q = context.query.q;

const books = await fetchBooks(q as string);

console.log("books terminal : ", books);

  return {
    props: {
        books,
    },
  };
};

export default function Page({books} : InferGetServerSidePropsType<typeof getServerSideProps>) {
//   const router = useRouter();
//   const { q } = router.query;
console.log("books : ", books);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
