import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const team = [
  {
    name: 'Sunil Bandai',
    role: 'Admin / Full Stack',
    description: 'Designed user experiences and built responsive product pages with a focus on conversion and clarity.',
  },
  {
    name: 'Pramod Nandagavi',
    role: 'Backend Lead',
    description: 'Implemented APIs, authentication, and order flows to make the marketplace reliable and secure.',
  },
  {
    name: 'Ashish Chougale',
    role: 'Frontend Lead',
    description: 'Crafted the brand direction, UI components, and accessible layouts for a polished shopper experience.',
  },
  {
    name: 'Vijay',
    role: 'Database',
    description: 'Connected frontend and backend workflows, optimized data handling, and ensured the app performs smoothly.',
  },
];

const AboutPage = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      <main className="pt-24 pb-xl px-6 max-w-container-max mx-auto">
        <section className="text-center mb-xl">
          <h1 className="font-h1 text-h1 mb-4">About KrushiMart</h1>
          <p className="text-on-surface-variant max-w-2xl mx-auto text-lg">
            KrushiMart is an agricultural e-commerce platform connecting farmers directly with consumers.
            Built with the MERN stack, it empowers rural producers to sell fresh produce online.
          </p>
        </section>

        <section>
          <h2 className="font-h2 text-h2 text-center mb-lg">Meet the Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="glass-panel bg-surface-container/60 rounded-xl p-8 border border-white/10 hover:border-primary/30 transition-colors"
              >
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-primary font-bold text-sm mb-3">{member.role}</p>
                <p className="text-on-surface-variant text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
