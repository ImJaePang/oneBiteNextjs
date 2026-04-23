import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode, useEffect } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fethRandomBooks from "@/lib/fetch-random-books";

export const getStaticProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 약속된 함수
  // const allBooks = await fetchBooks();
  // const randomBooks = await fethRandomBooks();
  // 병렬로 처리로 변경
  const [allBooks, randomBooks] = await Promise.all([
    fetchBooks(),
    fethRandomBooks(),
  ]);

  console.log("인덱스 페이지");

  return {
    props: {
      allBooks,
      randomBooks,
    },
    revalidate : 3,
  };
};

export default function Home({
  allBooks,
  randomBooks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  // console.log("allBooks : ", allBooks);
  // console.log("randomBooks : ", randomBooks);

  useEffect(() => {
    // 브라우저에서만 실행하고 싶은 함수는?
    // console.log(window);
  }, []);

  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        {randomBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  );
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
