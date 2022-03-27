import { createContext, ReactNode, useContext, useState } from "react"
import { http } from "../../../../configs/axios"

export type Project = {
    id: string,
    user: string,
    title: string,
    description: string,
    secretKey: string
}

type ProjectContextProviderProps = {
    children: ReactNode
}

type ProjectContextProps = {
    isLoading: boolean
    search: () => Promise<void>
    projects: Project[]
}

const ProjectContext = createContext({} as ProjectContextProps)

export function ProjectContextProvider({ children }: ProjectContextProviderProps) {
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState([] as Project[])


    const search = () => {
        setIsLoading(true)
        return http.get('/auth/project')
            .then((response) => setProjects([...response.data.content]))
            .catch((error) => console.warn(error))
            .finally(() => setIsLoading(false))
    }

    return (
        <ProjectContext.Provider value={{
            isLoading,
            search,
            projects
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjectContext() {
    return useContext(ProjectContext)
}
