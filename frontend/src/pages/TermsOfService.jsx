import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <main className="pt-28 pb-20 px-6 max-w-container-max mx-auto">
        <div className="glass-panel bg-surface-container/90 rounded-3xl p-10 shadow-xl border border-white/10">
          <h1 className="font-h1 text-h1 mb-6">Terms of Service</h1>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            These terms govern the use of KrushiMart’s platform. By using the site, you agree to our service terms, including order handling,
            content policies, and user conduct guidelines.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="font-h2 text-2xl mb-3">Use of the Platform</h2>
              <p className="text-on-surface-variant leading-relaxed">
                KrushiMart provides a marketplace for farmers and consumers to transact. You must use the platform responsibly and respect other users.
              </p>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">Orders and Payments</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Orders are processed through the platform and payment terms are displayed at checkout. Farmers are responsible for fulfilling items they accept.
              </p>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">Account Security</h2>
              <p className="text-on-surface-variant leading-relaxed">
                Keep your account credentials secure. KrushiMart is not responsible for unauthorized access from shared or compromised login details.
              </p>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">Support</h2>
              <p className="text-on-surface-variant leading-relaxed">
                For any questions or disputes, contact our support team through the Contact Us page.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
