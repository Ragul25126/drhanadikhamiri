'use client';

const reviews = [
  {
    text: "I’ve had a very positive experience in this clinic. The doctors are extremely knowledgeable and professional, clean environment and overall excellent. My doctor is Dr. Hanadi and she is amazing, Recommend it 100%",
    author: "L A."
  },
  {
    text: "I highly recommend dr.Hanadi\nShe is amazing? Professional and down to earth\nShe has been explaining every step of every procedure i have done at the clinic.\nShe very patient with me since i ask too many questions, and answers them all.\nThank you Dr.Hanadi for bringing back my smile 😍😍",
    author: "Amna Almaazmi"
  },
  {
    text: "Had multiple visits to Dr. Hanadi in Bin Arab dental to do filling for various parts of my teeth.. Its quite amazing that the work is so delicate and painless!.. i have been to dentists but to be honest this the best ive visited..\n\nThe dentist understands the problem of ur toothache immediately and would directly start proceeding very understanding and fast.. Highly recommended 5/5",
    author: "Ghanim Al Falasi"
  },
  {
    text: "I visited bin Arab few days ago and I have been treated by Dr hanadi she did some fillings for me and also a teeth whitening she was so good she explained everything for also she was so careful and kind\nSo to everyone one went there ask for here I highly recommend her 💕",
    author: "Chaima Bouali"
  },
  {
    text: "Very happy and recommend Dr. Hanida, she is explained each step that shows she knows what she do. Her work precise, clean environment and cooperative for treatment.",
    author: "Muhammet M. SUGLUN"
  },
  {
    text: "I had a refilling with Dr Hanadi and she was amazing. She handled it so well. I would recommend to visit Bin Arab dental.",
    author: "Fatim Rajabali"
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
