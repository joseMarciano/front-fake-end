import { ReactNode } from "react"
import CommonLayoutWrapper from "../../components/commonLayoutWrapper"

export default function Home() {

    return <h1>Aqui é o componente home</h1>
}

Home.getLayout = function getLayout(page: ReactNode) {
    return (
        <CommonLayoutWrapper>
            {page}
        </CommonLayoutWrapper>
    )
}