import { strapiFetch } from "../../scr/lib/strapi";

type Article = {
  id: number;
  attributes: {
    title: string;
    slug: string;
    summary?: string;
    publishedAt?: string | null;
    sourceName?: string;
    sourceUrl?: string;
  };
};

export default async function NewsPage() {
  const data = await strapiFetch(
    `/api/articles?sort[0]=createdAt:desc&pagination[pageSize]=20&fields[0]=title&fields[1]=slug&fields[2]=summary&fields[3]=sourceName&fields[4]=sourceUrl&fields[5]=publishedAt`
  );

  const articles: Article[] = data.data;

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700 }}>Новини</h1>

      <div style={{ marginTop: 24, display: "grid", gap: 16 }}>
        {articles.map((a) => (
          <article
            key={a.id}
            style={{ border: "1px solid #eee", padding: 16, borderRadius: 12 }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>
              {a.attributes.title}
            </h2>
            {a.attributes.summary && (
              <p style={{ marginTop: 8 }}>{a.attributes.summary}</p>
            )}
            {a.attributes.sourceUrl && (
              <p style={{ marginTop: 12, fontSize: 14 }}>
                Източник:{" "}
                <a
                  href={a.attributes.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.attributes.sourceName || a.attributes.sourceUrl}
                </a>
              </p>
            )}
          </article>
        ))}
      </div>
    </main>
  );
}
