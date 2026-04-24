import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react"
import style from "./searchable-layout.module.css";

export default function SearchableLayout({children} : {
    children : ReactNode
}){
    // console.log("children : ", children);
    const [search, setSearch] = useState("");
    const router = useRouter();

    const q = router.query.q as string;

    useEffect(()=>{
        setSearch(q || "");
    },[q]);

    const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    
    const onSubmit = () => {
        if (!search || q === search) return;
        router.push(`/search?q=${search}`);
    }

    const onKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter'){
            onSubmit();
        }
    }

    return <div>
            <div className={style.searchbar_container}>
                <input placeholder="place your search words" onChange={onChangeSearch} onKeyDown={onKeyDown} value={search}/>
                <button onClick={onSubmit} >search</button>
            </div>
            <div>{children}</div>
        </div>
}