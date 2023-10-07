import { fetchPageBlocks, fetchPageById } from "@/lib/notion/notion";

async function getData(id: string) {
  return fetchPageById(id) as any;
}

async function getBlocks(id: string) {
  return fetchPageBlocks(id);
}

export default async function BlogPost({
  params,
}: {
  params: { blogId: string };
}) {
  const pageData = await getData(params.blogId);
  const blockData = await getBlocks(params.blogId);

  return (
    <main className="mx-auto">
      <div className="flex flex-col gap-y-4">
        <div>
          <h1 className="text-xl font-semibold capitalize">
            {pageData.properties.Title.title[0].plain_text}
          </h1>
          <p className="text-sm capitalize">
            {new Date(pageData.properties.Date.date.start).toLocaleDateString(
              "en-US",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </p>
          <p className="text-md font-medium">
            {pageData.properties.Summary.rich_text[0]?.plain_text}
          </p>
        </div>
        <hr className="border-skin-line" />

        {blockData.results.map((element: any, index: number) => {
          return <Block typeOfBlock={element} key={index} />;
        })}
      </div>
    </main>
  );
}

const Block = ({ typeOfBlock }: { typeOfBlock: any }) => {
  if (typeOfBlock.type === "heading_1") {
    return <h1>{typeOfBlock.heading_1.rich_text[0].plain_text}</h1>;
  }
};
