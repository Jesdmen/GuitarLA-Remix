import { useState, useEffect } from 'react'
import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch,
    Link
} from '@remix-run/react'
import Header from '~/components/header'
import Footer from '~/components/footer'
import styles from '~/styles/index.css'

export function meta() {
    return(
        {
            charset: "utf-8",
            title: "GuitarLA - Remix",
            viewport: "width-device-width,inicial-scale-1"
        }
    )
}

export function links() {
    return[
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'stylesheet',
            href: styles
        },
        {
            rel: "preconnect",
            href: "https://fonts.googleapis.com"
        },
        {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossOrigin: "true"
        },
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&family=Playfair+Display:wght@700&family=Raleway:wght@400;700;900&family=Roboto:wght@400;700;900&display=swap" 
        }
    ]
}

export default function App () {

    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
    const [carrito, setCarrito] = useState(carritoLS);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = guitarra => {
        //Con este codigo evitamos que si cambiamos la cantidad de guitarras, nos genere un state diferente
        //Con .some iteramos sobre el arreglo para verificar si se repite el id de la 
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //Iterar sobre el arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad
                }
                return guitarraState;
            })
            //Añadir al carrito
            setCarrito(carritoActualizado)
        } else {
            //Registro nuevo, agregar al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    function actualizarCantidad (guitarra) {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    function eliminarGuitarra(id) {
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad, 
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document ({children}) {
    return (
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <Scripts/>
                <LiveReload/>
            </body>
        </html>
    )
}

//Manejo de Errores //

export function CatchBoundary () {
    const error = useCatch();

    return (
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to="/">Volver a la pagina principal</Link>
        </Document>
    )
}

export function ErrorBoundary ({error}) {
    return(
        <Document>
            <p className='error'>{error.status} {error.statusText}</p>
            <Link className='error-enlace' to="/">Volver a la pagina principal</Link>
        </Document>
    )
}