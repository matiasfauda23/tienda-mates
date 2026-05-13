import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductoPage({ params }: PageProps) {
  const { slug } = await params

  const producto = await prisma.producto.findUnique({
    where: { slug },
  })

  if (!producto) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-8 font-medium"
        >
          ← Volver al catálogo
        </a>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">{producto.nombre}</h1>
            <p className="text-emerald-100 mt-2">Mate premium</p>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center">
                  <span className="text-gray-400 text-lg">Imagen del producto</span>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div className="border-b border-gray-100 pb-6">
                  <p className="text-sm text-gray-500 mb-1">Precio</p>
                  <p className="text-4xl font-bold text-emerald-600">
                    ${producto.precio.toLocaleString('es-AR')}
                  </p>
                </div>

                <div className="border-b border-gray-100 pb-6">
                  <p className="text-sm text-gray-500 mb-1">Stock disponible</p>
                  <p className={`text-2xl font-semibold ${producto.stock > 0 ? 'text-gray-900' : 'text-red-500'}`}>
                    {producto.stock > 0 ? `${producto.stock} unidades` : 'Sin stock'}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-2">Descripción</p>
                  <p className="text-gray-700 leading-relaxed">{producto.descripcion}</p>
                </div>

                <button
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    producto.stock > 0
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  disabled={producto.stock === 0}
                >
                  {producto.stock > 0 ? 'Agregar al carrito' : 'Sin stock disponible'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}