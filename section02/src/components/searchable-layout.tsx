import { ReactNode } from "react"

export default function SearchableLayout({childrn} : {
    childrn : ReactNode
}){
    return <div>
            <div>임시 서치바</div>
        {childrn}
        </div>
}