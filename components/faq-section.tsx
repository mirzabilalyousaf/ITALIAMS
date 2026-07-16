import { faqItems } from "@/lib/data";

export function FAQSection() {
  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Client Support</p>
          <h2>Frequently asked questions</h2>
        </div>
        <div className="faq-grid">
          {faqItems.map((item) => (
            <details key={item.question} className="faq-item">
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
