import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"

// 1. Tipamos params como una Promesa (Estándar Next.js 15+)
export default async function ProductoDetalle({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 2. Desempaquetamos el slug usando await
  const { slug } = await params

  // 3. Buscamos el producto en la DB pasándole el slug ya resuelto
  const producto = await prisma.producto.findUnique({
    where: { slug },
  })

  // 4. Si no existe, mandamos al 404 de Next.js
  if (!producto) notFound()

  return (
    <main className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        {/* Botón para volver */}
        <Link href="/" className="text-emerald-600 hover:underline mb-8 inline-block font-medium">
          ← Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Imagen del Producto */}
          <div>
            {producto.fotos && producto.fotos.length > 0 ? (
              <img 
                src={producto.fotos[0]} 
                alt={producto.nombre} 
                className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
              />
            ) : (
              <div className="w-full h-[500px] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 border-2 border-dashed">
                Sin imagen disponible
              </div>
            )}
          </div>

          {/* Información del Producto */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{producto.nombre}</h1>
            <p className="text-3xl font-semibold text-emerald-600 mb-6">
              ${producto.precio.toLocaleString('es-AR')}
            </p>
            
            <div className="prose prose-slate mb-8">
              <h3 className="text-lg font-medium text-gray-700 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">
                {producto.descripcion}
              </p>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                producto.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {producto.stock > 0 ? `Stock disponible: ${producto.stock}` : 'Sin stock'}
              </span>
            </div>

            <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-md">
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}