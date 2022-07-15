import { createContext, useState } from "react"

export const CreatePost = createContext()

export const CreatePostProvider = ({children}) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <CreatePost.Provider value={{isVisible}}>
            {children}
        </CreatePost.Provider>
    )
}

