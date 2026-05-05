// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchedBook ({q} : {q : string}){

  await delay(1500);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    {cache: "force-cache"}
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다 ...</div>
  }
  const searchedBooks : BookData[] = await response.json();
  return <div>
    {searchedBooks.map((book)=><BookItem key={book.id} {...book} />)}
  </div> 
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  return (
      <Suspense key={q || ""} fallback={<div>로딩중...</div>}>
        <SearchedBook q={q || ""} />
      </Suspense>
  );
}
