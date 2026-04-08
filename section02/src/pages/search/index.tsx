import { useRouter } from "next/router"

export default function Page () {

    const router = useRouter();
    const {p} = router.query;


    console.log("router : ", router);

    return <h1>search {p}</h1>
}