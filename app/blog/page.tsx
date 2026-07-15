import { blogPosts } from "@/lib/data";

export default function BlogPage() {
  return (
    <section className="section section-top">
      <div className="container">
        <p className="eyebrow">Journal</p>
        <h1>Leather education and craftsmanship insights</h1>
        <p className="lead">
          Articles on leather types, care techniques, and the making philosophy behind ITALIAMS.
        </p>
        <div className="blog-grid">
          {blogPosts.map((post) => (
            <article key={post.slug} className="blog-card reveal">
              <img src={post.image} alt={post.title} />
              <div className="blog-body">
                <p className="badge">{new Date(post.date).toLocaleDateString("en-PK")}</p>
                <h2>{post.title}</h2>
                <p className="muted">{post.excerpt}</p>
                <p>{post.body}</p>
                <small>{post.readTime} read</small>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
