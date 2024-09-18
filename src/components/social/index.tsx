import { ReactNode } from "react"; // é um tipo jsx componente do react

interface SocialProps{
    url: string;
    children: ReactNode
}

export function Social ({url, children}: SocialProps){
    return(
        <a
        href={url}
        rel="noopener noreferrer"  // tem que informar que trata-se de uma url externa, passando entre aspas. 
        target="_blank"  // para abrir em uma nova aba e nao na mesma
        >
            {children}
        </a>
    )
}