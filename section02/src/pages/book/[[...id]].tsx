import { useRouter } from "next/router";

export default function Page (){

    const router = useRouter();
    console.log("router : ", router)

    const {id} = router.query;
    console.log("id[] : ", id)

    return <h1>Book {id}</h1>
}