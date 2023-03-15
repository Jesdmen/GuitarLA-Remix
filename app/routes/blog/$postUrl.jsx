import { getPost } from "../../models/post.server"
import { useLoaderData } from "@remix-run/react"
import {formatearFecha} from "~/utils/helpers.js"

export function meta(data) {
    
    if(!data.data.data) {
        return{
            title: "Entrada no encontrada",
            description: `Guitarras, venta de guitarras, entrada no encontrada`
        }
    }
    return(
        {
            title: `GuitarLA - ${data.data.data[0].attributes.titulo}`,
            description: `Guitarras, venta de guitarras, guitarra ${data.data.data[0].attributes.nombre}`
        }
    )
}

export async function loader({params}) {
    const {postUrl} = params;
    const post = await getPost(postUrl)

    if(post.data.length === 0) {
        throw new Response('', {
            status: 404,
            statusText: "Entrada no encontrada"
        })
    }

    return post
}

export default function Post() {

    const post = useLoaderData()
    const {titulo, contenido, imagen, publishedAt} = post.data[0].attributes;
return (
    <article className="post">
        <h3 className="titulo">{titulo}</h3>
        <img src={imagen.data.attributes.url} alt={`Imagen blog ${titulo}`} />
        <p className="fecha">Publicado el {formatearFecha(publishedAt)}</p>
        <p className="texto">{contenido}</p>
        
    </article>
    )
}
