import { fetchPages } from "@/lib/notion/notion";
import BlogEntry from "@/app/blogs/BlogEntry/BlogEntry";

async function getData() {
  return fetchPages();
}

export default async function Blogs() {
  const data = await getData();

  if (data.results.length === 0) {
    return (
      <>
        <main className="">
          <h1 className="text-xl mx-auto font-semibold">
            Its next on the list, trust me. Connect with me on{" "}
            <a
              className="underline font-bold cursor-pointer"
              href="https://www.linkedin.com/in/samir-zafar-6b59111bb/"
            >
              LinkedIn
            </a>{" "}
            to know when I post the first.
          </h1>
        </main>
      </>
    );
  }

  return (
    <main className="mx-auto">
      <div className="grid grid-cols-1 gap-10 gap-y-16 pb-24 md:grid-cols-2">
        {data.results.map((element, index) => {
          return <BlogEntry key={index} element={element} />;
        })}
      </div>
    </main>
  );
}
