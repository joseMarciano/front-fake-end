import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { http } from "../../../../configs/axios"
import { Page, useInfiniteScroll } from "../../../../hooks/useInfiniteScroll"

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
    search: () => Promise<Page>
    deleteById: (id: string) => Promise<void>
    save: (data: Pick<Project, 'title' | 'description'>) => Promise<void>
    projects: Project[]
}

const ProjectContext = createContext({} as ProjectContextProps)

export function ProjectContextProvider({ children }: ProjectContextProviderProps) {
    const [isLoading, setIsLoading] = useState(false)
    let [projects, setProjects] = useState([] as Project[])

    const searchInfiniteScroll = async (params: Omit<Page, 'total' | 'content' | 'hasNext'>): Promise<Page> => {
        setIsLoading(true)
        return await http.get('/auth/project', {
            params
        })
            .then((response) => {
                setProjects(projects.concat(response.data?.content || []))
                return response.data
            })
            .catch((error) => console.warn(error))
            .finally(() => setIsLoading(false))
    }

    useInfiniteScroll(searchInfiniteScroll)

    const save = async (data: Pick<Project, 'title' | 'description'>): Promise<void> => {
        return await http.post('/auth/project', data)
            .catch((error) => console.warn(error))
            .then(() => { search() })
    }

    const search = async (): Promise<Page> => {
        projects = []
        return await searchInfiniteScroll({
            limit: 20, offset: 0
        })
    }

    const deleteById = async (id: string): Promise<void> => {
        const findProjectByIdAndRemove = (): Project[] => {
            return projects.filter((project) => project.id !== id)
        }

        return await http.delete(`/auth/project/${id}`)
            .then(() => setProjects([...findProjectByIdAndRemove()]))
            .catch((error) => console.warn(error))

    }

    return (
        <ProjectContext.Provider value={{
            isLoading,
            search,
            deleteById,
            save,
            projects
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export function useProjectContext() {
    return useContext(ProjectContext)
}
