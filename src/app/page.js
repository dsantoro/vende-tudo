import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { request } from "../lib/datocms";

const PRODUCTS_QUERY = `query ProductsPage {
  allProducts {
    id
    title
    images {
      id
      alt
      url
    }
    available
    description
    price
    link
  }
}`;

export default async function Home() {
  const data = await request({
    query: PRODUCTS_QUERY,
  });

  const { allProducts } = data;

  return (
    <div className="max-w-6xl mx-auto container px-4">
      <h1 className="text-4xl my-4">Lista de items a venda</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allProducts.map((item) => {
          return (
            <div
              className={`w-full shadow-md rounded-md p-5 ${
                !item.available && "grayscale"
              }`}
              key={item.id}
            >
              <h2 className="text-2xl mb-4 h-16 overflow-hidden text-purple-700">
                {item.title}
              </h2>
              {item.images.map((image) => {
                return (
                  <div
                    key={image.id}
                    className="relative w-100 h-64 mb-6 bg-zinc-200 rounded"
                  >
                    <Image
                      className="object-contain"
                      fill
                      key={image.id}
                      src={image.url}
                      alt={image.title || "Alternative Description"}
                    />
                  </div>
                );
              })}
              <div className="h-24 overflow-y-auto mb-4">
                <ReactMarkdown>{item.description}</ReactMarkdown>
              </div>
              <p className="text-2xl font-semibold mb-4 text-right">
                Valor: {item.price} €
              </p>

              <div className="flex flex-col gap-4">
                {item.link ? (
                  <a
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    href={item.link}
                    target="_blank"
                    rel="noopener noreffer"
                  >
                    Ver na loja
                  </a>
                ) : (
                  "Sem link"
                )}

                <a
                  className={`text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${
                    !item.available && "cursor-not-allowed pointer-events-none"
                  }`}
                  href={
                    item.available
                      ? `https://api.whatsapp.com/send?phone=+351910272254&text=${item.title}`
                      : ""
                  }
                  target="_blank"
                  rel="noopener noreffer"
                >
                  {item.available
                    ? "Tenho interesse - via Whatsapp"
                    : "Indisponível"}
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
