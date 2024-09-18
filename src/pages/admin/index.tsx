import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { useEffect, useState, } from "react";
import { FiTrash } from "react-icons/fi";
import { FormEvent } from "react";
import { db } from "../../services/firebaseConection";
import { addDoc, collection, onSnapshot, query, orderBy, doc, deleteDoc, } from 'firebase/firestore'

interface LinkPropos {
    id: string;
    name: string;
    url: string;
    bg: string;
    color: string;
}

export function Admin() {

    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#f1f1f1")
    const [bgColorInput, setBgColorInput] = useState("#121212")

    const [links, setLinks] = useState<LinkPropos[]>([])

    // usando o useEffect para buscar e acessar os dados do banco de dados
    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("created", "asc"))
        // o onSnapshot é um observador em tempo real para monitorar o banco
        const unsub = onSnapshot(queryRef, (snapshot) => {

            let lista = [] as LinkPropos[]; // LinkProps é uma interface para tipar a lista que vem do banco

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    name: doc.data().name,
                    url: doc.data().url,
                    bg: doc.data().bg,
                    color: doc.data().color
                })
            })

            setLinks(lista) // busco no banco e passo para a useStates a lista
        })
        // quando eu sair desse componente ele precisa ser desmontado assim eu faco com o return 
        return () => {
            unsub(); // chamando ele remove o listener  quando invocado
        }

    }, [])

    function handleRegister(e: FormEvent) {
        e.preventDefault();
        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os Campos Shelly ")
            return;
        }
        //  addDoc ele é uma promisse pode tratar o caso de erro ou nao
        addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            bg: bgColorInput,
            color: textColorInput,
            created: new Date()
        })
            .then(() => {
                setNameInput("")
                setUrlInput("")
                console.log("Cadastrado com sucesso")

            })
            .catch((error) => {
                console.log("ERRO AO CADASTRAR NO BANCO" + error)
            })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef)

    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />

            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister}>
                <label className=" text-white font-medium mt-2 mb-2"> Nome do Link </label>
                <Input
                    placeholder="Digite o nome do link"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                />

                <label className=" text-white font-medium mt-2 mb-2"> URL do Link </label>
                <Input
                    type="url"
                    placeholder="Digite a url..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                />

                <section className="flex my-4 gap-5">
                    <div className=" flex gap-2">
                        <label className=" text-white font-medium mt-2 mb-2"> Cor do Link </label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e) => setTextColorInput(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2">
                        <label className=" text-white font-medium mt-2 mb-2"> Fundo do Link </label>
                        <input
                            type="color"
                            value={bgColorInput}
                            onChange={(e) => setBgColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {
                    nameInput !== '' && (
                        <div className="flex items-center just flex-col mb-7 p-1 border-gray-100/25 border rounded-md">
                            <label className=" text-white font-medium mt-2 mb-3"> Veja como esta ficando: </label>
                            <article
                                className="w-11/12 max-w-lg flex-col items-center justify-between bg-zinc-900 rounded px-1 py-3"
                                style={{ marginBottom: 8, marginTop: 8, background: bgColorInput }}
                            >
                                <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
                            </article>

                        </div>
                    )
                }

                <button type="submit" className="bg-blue-600 h-9 rounded-md text-white font-medium gap-4 flex justify-center items-center">

                    Cadastrar
                </button>

            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">
                Meus Links
            </h2>

            {links.map((item) => (
                <article
                    key={item.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 gap-3 select-none"
                    style={{ backgroundColor: item.bg, color: item.color }}
                >
                    <p>{item.name}</p>
                    <div>
                        <button
                            className="border border-dashed p-1 rounded"
                            onClick={() => handleDeleteLink(item.id)}
                        >

                            <FiTrash size={18} color="#FFF" />
                        </button>
                    </div>
                </article>
            ))}

        </div>
    )
}