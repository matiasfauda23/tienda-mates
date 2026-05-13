import { prisma } from "@/lib/prisma"

export default async function Home() {
  // Consultamos a la base de datos directamente con consultas tipadas
  const productos = await prisma.producto.findMany()

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Tienda de Mates
        </h1>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {productos.map((mate) => (
            <div 
              key={mate.id} 
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
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
            </div>
          ))}
        </div>

        {productos.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Todavía no hay mates cargados en la base de datos.
          </p>
        )}
      </div>
    </main>
  )
}