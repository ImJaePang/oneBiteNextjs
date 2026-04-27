import { BookData } from "@/types";

export default async function fethRandomBooks() : Promise<BookData[]>{
    const url = "https://onebite-books-server-main-one-indol.vercel.app/book/random";

    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error();
        }
        return await response.json();

    } catch (err){
        console.log("err : " , err);

        return [];
    }
}