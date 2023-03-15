import {getGuitarras} from "~/models/guitarras.server.js"
import {getPosts} from "~/models/post.server.js"
import {getCurso} from "~/models/curso.server.js"
import { useLoaderData } from "@remix-run/react"
import ListadoGuitarras from "../components/listado-guitarras"
import ListadoPosts from "../components/listado-posts"
import Curso from "../components/curso"
import StylesGuitarra from "~/styles/guitarras.css"
import StylePosts from "~/styles/blog.css"
import StyleCurso from "~/styles/curso.css"

export function meta(){

}

export function links(){
  return[
    {
      rel: "stylesheet",
      href: StylesGuitarra
    },
    {
      rel: "stylesheet",
      href: StylePosts
    },
    {
      rel: "stylesheet",
      href: StyleCurso
    }
  ]
}

export async function loader() {
  
  //Con esta sintaxis tenemos un mejor performance, para que primero consuma la data de guitarras y después la de posts
  const [guitarras, posts, curso] = await Promise.all([
    getGuitarras(), 
    getPosts(),
    getCurso()
  ])

  return {
    guitarras: guitarras.data,
    posts: posts.data,
    curso: curso.data
  }
}

const Index = () => {

  const {guitarras, curso, posts} = useLoaderData();

  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}
        />
      </main>
      <main className="contenedor">
        <Curso
          curso={curso.attributes}
        />
      </main>
      <article className="contenedor">
        <ListadoPosts
          posts={posts}
        />
      </article>
    </>
  )
}

export default Index