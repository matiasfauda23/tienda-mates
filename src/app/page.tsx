import Link from 'next/link'
import { prisma } from '@/lib/prisma'

export default async function Home() {
  const productos = await prisma.producto.findMany()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Tienda de Mates</h1>
          <p className="text-gray-600 mt-2">Encontrá el mate perfecto para vos</p>
        </header>

        <section aria-label="Catálogo de productos">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {productos.map((mate) => (
              <article key={mate.id}>
                <Link
                  href={`/productos/${mate.slug}`}
                  className="block bg-white p-6 rounded-lg border border-gray-100 hover:border-emerald-200 hover:shadow-xl transition-all duration-200 h-full"
                >
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {mate.nombre}
                  </h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {mate.descripcion}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                    <span className="text-2xl font-bold text-emerald-600">
                      ${mate.precio.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      Stock: {mate.stock}
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {productos.length === 0 && (
            <p className="text-center text-gray-500 mt-12">
              Todavía no hay mates cargados en la base de datos.
            </p>
          )}
        </section>
      </div>
    </main>
  )
}