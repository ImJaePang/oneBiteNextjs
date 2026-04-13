import { useRouter } from "next/router";
import { ReactNode, useState } from "react"

export default function SearchableLayout({children} : {
    children : ReactNode
}){
    // console.log("children : ", children);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const q = router.query.q;

    const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
    const onSubmit = () => {
        if (!search) return;
        router.push(`/search?q=${search}`);
    }

    return <div>
            <div>
                <input placeholder="place your search words" onChange={onChangeSearch} value={search}/>
                <button onClick={onSubmit}>search</button>
            </div>
            <div>{children}</div>
        </div>
}