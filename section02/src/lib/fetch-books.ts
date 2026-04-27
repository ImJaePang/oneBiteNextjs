import { BookData } from "@/types";

export default async function fetchBooks (q?:string) : Promise<BookData[]>{
    let url = "https://onebite-books-server-main-one-indol.vercel.app/book";

    if(q){
        url = `https://onebite-books-server-main-one-indol.vercel.app/book/search?q=${q}`;
    }
    console.log("url :", url);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error();
        }
        return await response.json();
    } catch (err) {
        console.log(err);
        return [];
    }
}