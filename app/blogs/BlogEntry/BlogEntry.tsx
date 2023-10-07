import ClientSideRoute from "@/lib/components/ClientSideRoute";
import Image from "next/image";

export default function BlogEntry({ element }: { element: any }) {
  return (
    <ClientSideRoute route={`/blogs/${element.id}`}>
      <div className="flex flex-col group cursor-pointer">
        <BlogCard element={element} />
        <BlogDescription elementProperties={element.properties} />
        <p>Read Post</p>
      </div>
    </ClientSideRoute>
  );
}

const BlogCard = ({ element }: { element: any }) => {
  return (
    <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
      <Image
        className="object-cover object-left"
        src={"/images/portfolio/emc.png"}
        alt="Blog"
        fill
      />
      <BlogCardBanner elementProperties={element.properties} />
    </div>
  );
};

const BlogCardBanner = ({ elementProperties }: { elementProperties: any }) => {
  return (
    <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded drop-shadow-lg text-white p-5 flex justify-between">
      <div>
        <p className="font-bold">
          {elementProperties.Title.title[0].text.content}
        </p>
        <p>
          {new Date(elementProperties.Date.date.start).toLocaleDateString(
            "en-US",
            {
              day: "numeric",
              month: "long",
              year: "numeric",
            }
          )}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2">
        {elementProperties.Tags.multi_select.map(
          (element: any, index: number) => {
            return (
              <div key={index}>
                <p className="bg-[#F7AB0A] text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                  {element.name}
                </p>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

const BlogDescription = ({ elementProperties }: { elementProperties: any }) => {
  return (
    <div className="mt-5 flex-1">
      <p className="underline text-lg font-bold">
        {elementProperties.Title.title[0].text.content}
      </p>
      <p className="line-clamp-2 text-gray-500">
        {elementProperties.Summary.rich_text[0]?.plain_text}
      </p>
    </div>
  );
};
