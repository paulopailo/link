import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { FormEvent, useEffect, useState } from "react";
import { db } from "../../services/firebaseConection";
import {
    setDoc,
    doc,
    getDoc
} from 'firebase/firestore';

export function Networks() {

    const [facebook, setFacebook] = useState("")
    const [instagran, setInstagran] = useState("")
    const [youTube, setYouTube] = useState("")

    useEffect (() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            // .then caso der tudo certo na requisicao do getDoc, o .then e a garantia da resposta
            .then((snapShot) => {
                if (snapShot.data() !== undefined){
                    setFacebook (snapShot.data()?.facebook)
                    setInstagran (snapShot.data()?.instagran)
                    setYouTube (snapShot.data()?.youtube) // esse ? serve que se caso nao exista nada ele coloca como vazio o campo evitando o erros
                }
            })
        }
        loadLinks();
    }, [])

    function handleRegister(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
 // setDoc criando um documento, acessar o documento com o doc, depois o db abrindo a conexao com o banco
 // chamando uma clection de "Social" e o nomde do documento neste caso é o link, apos oque ueremos dentro deste docmuneto
 // neste caso o facebook ... inst, you. pegamos tudo que digitou e colocamos dentro do documento
 // como ele é uma promisse, colocamos um then para que ele espera para caso der certo ele recebaa a funcao anonima.
        setDoc(doc(db, "social", "link"),{
            facebook: facebook,
            instagran: instagran,
            youtube: youTube
        })
        .then(() => {
            console.log("Cadastrado com SUCESSO ")
        })
        .catch((error ) => {
            console.log("Erro ao salvar" + error)
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2">
            <Header />
            <h1 className="text-white text-2xl font-medium mt-8 mb-4"> Minhas Redes Sociais </h1>
            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister}>
                <label className="text-white font-medium mt-2 mb-3"> Link do Facebook da Shelly </label>
                <Input
                    type="url"
                    placeholder="Digite a url do facebook"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
                />

                <label className="text-white font-medium mt-2 mb-3"> Link do Instagran da Shelly </label>
                <Input
                    type="url"
                    placeholder="Digite a url do instagran"
                    value={instagran}
                    onChange={(e) => setInstagran(e.target.value)}
                />


                <label className="text-white font-medium mt-2 mb-3"> Link do YouTube da Shelly </label>
                <Input
                    type="url"
                    placeholder="Digite a url do YouTube"
                    value={youTube}
                    onChange={(e) => setYouTube(e.target.value)}
                />
                <button
                    type="submit"
                    className="text-white bg-blue-600 h-9 rounded-md items-center justify-center flex mb-7 mt-5 font-medium"
                >
                    Salvar Links
                </button>

            </form>
        </div>
    )
}