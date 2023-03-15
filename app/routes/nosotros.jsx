import imagen from "../../public/img/nosotros.jpg"
import styles from "~/styles/nosotros.css"
//Con use outlet context nos traemos el objeto de root pasado por context, y lo podemos usar en cualquier componente
//El outletContext solo está disponible en el primer nivel de hijos, para llamarlo en rutas anidadas
// toca mandar llamar el useOuletContext y pasarlo como si fuese un prop a la ruta hija
import { useOutletContext } from "@remix-run/react"

export function meta() {
  return(
      {
          tittle: "GuitarLA - Nosotros",
          description: "Venta de guitarras, blog de música"
      }
  )
}


export function links() {
  return[
    {
      rel: "stylesheet",
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

const Nosotros = () => {

  const data = useOutletContext();
 

  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt="imagen nosotros" />
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis nulla vitae justo faucibus bibendum sit amet imperdiet elit. In neque nisl, feugiat ac suscipit ut, facilisis ac velit. Vivamus et arcu quis velit ornare auctor. Phasellus euismod, leo id posuere ullamcorper, risus dolor gravida elit, et accumsan urna massa ut ante. Aliquam pharetra augue a nisl bibendum sollicitudin. Nullam in nunc mauris. Nulla ultricies magna fermentum erat lobortis dignissim. Donec nec fermentum erat. Sed vestibulum lacinia tellus ut interdum. Praesent ac egestas ante. Suspendisse tincidunt sapien ac mi ultrices, et posuere ligula hendrerit. Quisque efficitur lorem nec tristique vehicula. Quisque lobortis risus et eros feugiat laoreet. Ut suscipit volutpat lobortis.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam quis nulla vitae justo faucibus bibendum sit amet imperdiet elit. In neque nisl, feugiat ac suscipit ut, facilisis ac velit. Vivamus et arcu quis velit ornare auctor. Phasellus euismod, leo id posuere ullamcorper, risus dolor gravida elit, et accumsan urna massa ut ante. Aliquam pharetra augue a nisl bibendum sollicitudin. Nullam in nunc mauris. Nulla ultricies magna fermentum erat lobortis dignissim. Donec nec fermentum erat. Sed vestibulum lacinia tellus ut interdum. Praesent ac egestas ante. Suspendisse tincidunt sapien ac mi ultrices, et posuere ligula hendrerit. Quisque efficitur lorem nec tristique vehicula. Quisque lobortis risus et eros feugiat laoreet. Ut suscipit volutpat lobortis.</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros