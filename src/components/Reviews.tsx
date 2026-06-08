'use client';

const reviews = [
  {
    text: "Dr. Hanadi completely transformed my smile with porcelain veneers. The entire experience was luxurious, painless, and highly professional. Highly recommend her clinic in Al Safa.",
    author: "Fatima A."
  },
  {
    text: "I traveled from London just to get my Invisalign treatment sorted with Dr. Hanadi. Her attention to detail and bespoke care is absolutely unmatched anywhere.",
    author: "Sarah W."
  },
  {
    text: "The clinic feels like a 5-star hotel. My ceramic crowns look incredibly natural, perfectly matching my original teeth. The absolute standard of excellence in Dubai.",
    author: "Mohammed R."
  }
];

export default function Reviews() {
  return (
    <section id="reviews">
      <div className="container">
        <div className="section-header reveal">
          <h2>Patient Testimonials</h2>
          <p style={{ marginTop: '1rem' }}>Read about the world-class experiences of our valued clients.</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, idx) => (
            <div key={idx} className={`review-card reveal delay-${idx + 1}`}>
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{review.text}"</p>
              <div className="review-author">— {review.author}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
