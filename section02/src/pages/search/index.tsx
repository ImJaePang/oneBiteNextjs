import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router"
import { ReactNode } from "react";

export default function Page () {

    const router = useRouter();
    const {p} = router.query;


    console.log("router : ", router);

    return <h1>search {p}</h1>
}

Page.getLayout = (page : ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}