import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Quote, MessageSquareQuote, Star } from 'lucide-react';

const Testimonials = () => {
  const { data } = usePortfolio();
  const { testimonials, sectionVisibility } = data;

  if (!sectionVisibility?.testimonials) return null;

  const items = testimonials?.items || [];

  return (
    <section id="testimonials" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-[90px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          {testimonials?.badgeText && (
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-primary/30 text-primary text-xs sm:text-sm font-semibold tracking-wide">
              <MessageSquareQuote className="w-4 h-4 text-accent" />
              <span>{testimonials.badgeText}</span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-main tracking-tight">
            {testimonials?.title || 'Client & Peer Testimonials'}
          </h2>
          
          <p className="text-base sm:text-lg text-text-muted">
            {testimonials?.subtitle}
          </p>
          
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-2" />
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="glass-card p-8 rounded-3xl border border-border-color shadow-lg hover:shadow-2xl hover:border-primary/40 flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1 relative"
            >
              {/* Large Background Quote Icon */}
              <div className="absolute top-6 right-6 text-primary/10 group-hover:text-primary/20 transition-colors pointer-events-none">
                <Quote className="w-16 h-16 rotate-180" />
              </div>

              {/* Quote Text */}
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-text-main font-normal leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 mt-6 border-t border-border-color flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/30 shrink-0 bg-bg-base">
                  <img
                    src={item.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop'}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="overflow-hidden">
                  <div className="font-bold font-heading text-base text-text-main group-hover:text-primary transition-colors truncate">
                    {item.author}
                  </div>
                  <div className="text-xs font-medium text-text-muted truncate mt-0.5">
                    {item.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
