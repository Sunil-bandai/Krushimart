import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <main className="pt-28 pb-20 px-6 max-w-container-max mx-auto">
        <div className="glass-panel bg-surface-container/90 rounded-3xl p-10 shadow-xl border border-white/10">
          <h1 className="font-h1 text-h1 mb-6">Privacy Policy</h1>
          <p className="text-on-surface-variant leading-relaxed mb-6">
            At KrushiMart, we take your privacy seriously. We only collect personal information that is necessary to provide our marketplace services,
            process orders, and improve the experience for both farmers and consumers.
          </p>

          <section className="space-y-6">
            <div>
              <h2 className="font-h2 text-2xl mb-3">Information We Collect</h2>
              <ul className="list-disc list-inside text-on-surface-variant space-y-2">
                <li>Contact details such as name, email, phone, and address.</li>
                <li>Order history and product preferences for a personalized experience.</li>
                <li>Authentication details to keep your account secure.</li>
              </ul>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">How We Use Data</h2>
              <p className="text-on-surface-variant leading-relaxed">
                We use your information to process orders, manage seller inventory, communicate updates, and enhance the marketplace experience.
                We do not sell your personal data to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">Security</h2>
              <p className="text-on-surface-variant leading-relaxed">
                KrushiMart uses modern security practices to protect your account and transaction data. Access is restricted and data is handled responsibly.
              </p>
            </div>

            <div>
              <h2 className="font-h2 text-2xl mb-3">Contact</h2>
              <p className="text-on-surface-variant leading-relaxed">
                If you have questions about your privacy or our policies, please visit our Contact Us page.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
