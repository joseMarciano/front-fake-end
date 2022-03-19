import { ReactNode } from "react"
import LinkNext from 'next/link'

type LinkProps = {
    children: ReactNode
    to: string
}

export default function Link({ children, to }: LinkProps) {

    return (
        <LinkNext href={to}>
            <a>
                {children}
            </a>
        </LinkNext>
    )

}