import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <main className="pt-28 pb-20 px-6 max-w-container-max mx-auto">
        <div className="glass-panel bg-surface-container/80 rounded-3xl p-10 shadow-xl border border-white/10">
          <h1 className="font-h1 text-h1 mb-6 text-center">About KrushiMart</h1>
          <p className="text-on-surface-variant leading-relaxed max-w-3xl mx-auto text-base sm:text-lg">
            KrushiMart is a farmer-to-consumer marketplace built to connect growers and shoppers through a simple,
            trustworthy, and sustainable digital storefront. Our platform helps farmers showcase their produce,
            manage orders, and receive fair prices, while consumers discover fresh local goods and place secure orders.
          </p>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-3xl overflow-hidden bg-black/80 border border-white/10">
              <video className="w-full h-full object-cover" controls poster="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80">
                <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="flex flex-col justify-center gap-6">
              <div>
                <h2 className="font-h2 text-3xl mb-3">Our Story</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  We built KrushiMart to bridge the gap between farmers and modern shoppers. The platform
                  is designed to reduce intermediaries, support local agriculture, and deliver fresh produce
                  directly from farms to customers.
                </p>
              </div>
              <div>
                <h2 className="font-h2 text-3xl mb-3">Mission</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Our mission is to empower rural producers with digital tools while creating a seamless,
                  transparent experience for consumers who care about quality, sustainability, and income fairness.
                </p>
              </div>
            </div>
          </div>

          <section className="mt-16">
            <h2 className="font-h2 text-3xl mb-8 text-center">Meet the Creators</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                { name: 'Aarav Sharma', role: 'Frontend Lead', description: 'Designed user experiences and built responsive product pages with a focus on conversion and clarity.' },
                { name: 'Priya Verma', role: 'Backend Lead', description: 'Implemented APIs, authentication, and order flows to make the marketplace reliable and secure.' },
                { name: 'Riya Patel', role: 'UX Designer', description: 'Crafted the brand direction, UI components, and accessible layouts for a polished shopper experience.' },
                { name: 'Vikram Singh', role: 'Full Stack Developer', description: 'Connected frontend and backend workflows, optimized data handling, and ensured the app performs smoothly.' },
              ].map((member) => (
                <div key={member.name} className="glass-panel bg-surface-container/80 rounded-3xl p-6 border border-white/10">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-on-surface-variant leading-relaxed">{member.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
