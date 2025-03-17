
import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "Rajesh Kumar",
    position: "Community Leader",
    quote: "A dedicated leader who has transformed our constituency...",
    image: "/assets/testimonials/leader1.jpg"
  },
  {
    name: "Priya Sharma",
    position: "Social Activist",
    quote: "Their commitment to social welfare is truly commendable...",
    image: "/assets/testimonials/activist1.jpg"
  }
];

export default function TestimonialsSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Testimonials</h2>
        <Slider {...settings}>
          {testimonials.map((item, index) => (
            <div key={index} className="px-4">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full rounded-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://placehold.co/200x200?text=T";
                    }}
                  />
                </div>
                <blockquote className="text-xl italic mb-4">"{item.quote}"</blockquote>
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-400">{item.position}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
