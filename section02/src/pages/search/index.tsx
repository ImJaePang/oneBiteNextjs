import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import BookItem from "@/components/book-item";
// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import { BookData } from "@/types";
import Head from "next/head";

// export const getStaticProps = async (
//   context: GetStaticPropsContext,
// ) => {
// //   console.log("context : ", context);
// //   console.log("context.query.q : ", context.query.q);
// const q = context.query.q;

// const books = await fetchBooks(q as string);

// console.log("books terminal : ", books);

//   return {
//     props: {
//         books,
//     },
//   };
// };

export default function Page() {

  const [books, setBooks] = useState<BookData[]>([]);
  const router = useRouter();
  const q = router.query.q;
// console.log("books : ", books);

const fetchSearchResult = async () => {
  const data = await fetchBooks(q as string);
  setBooks(data);
}

  useEffect(()=>{
    if(q) {
      // 검색결과를 불러오는 로직
      fetchSearchResult();
    }
  },[q]);


  return (
    <div>
      <Head>
        <title>oneBiteBooks - searchResult</title>
        <meta property="og:imgage" content="/thumbnail.png" />
        <meta property="og:title" content="oneBiteBooks" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들을 만나보세요"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
