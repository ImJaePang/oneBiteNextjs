import BookItem from "@/components/book-item";

import { BookData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';


async function SearchedBook({ q }: { q: string }) {

    const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
        { cache: "force-cache" },
    );
    if (!response.ok) {
        return <div>오류가 발생했습니다 ...</div>;
    }
    const searchedBooks: BookData[] = await response.json();
    return (
        <div>
            {searchedBooks.map((book) => (
                <BookItem key={book.id} {...book} />
            ))}
        </div>
    );
}

// export const metadata : Metadata = {
//     title : "한입북스 : 검색어",
//     description : "",
//     openGraph : {},
// }

export async function generateMetadata ({searchParams} : {searchParams : Promise<{q? : string}>}) : Promise<Metadata> {

    const {q} = await searchParams;

    return {
        title : `${q} : 한입북스 검색`,
        description : `${q}에 대한 검색 결과 입니다.`,
        openGraph : {
            title : `${q} : 한입북스 검색`,
            description : `${q}에 대한 검색 결과 입니다.`,
            images : ["/thumbnail.png"],
        }
    }
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;

    return (
        <Suspense key={q || ""} fallback={<Skeleton count={3} />}>
            <SearchedBook q={q || ""} />
        </Suspense>
    );
}
