import Footer from '../components/Footer';

const ContactUs = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <main className="pt-28 pb-20 px-6 max-w-container-max mx-auto">
        <div className="glass-panel bg-surface-container/90 rounded-3xl p-10 shadow-xl border border-white/10">
          <h1 className="font-h1 text-h1 mb-6">Contact Us</h1>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            Have a question or need support? Reach out to the KrushiMart team and we’ll help you as quickly as possible.
          </p>

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h2 className="font-h2 text-2xl mb-3">Customer Support</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  Email us at <a className="text-primary" href="mailto:support@krushimart.com">support@krushimart.com</a>
                  for order inquiries, account help, or product feedback.
                </p>
              </div>
              <div>
                <h2 className="font-h2 text-2xl mb-3">Business Inquiries</h2>
                <p className="text-on-surface-variant leading-relaxed">
                  For partnerships, farmer onboarding, or press requests, email <a className="text-primary" href="mailto:partners@krushimart.com">partners@krushimart.com</a>.
                </p>
              </div>
              <div>
                <h2 className="font-h2 text-2xl mb-3">Phone</h2>
                <p className="text-on-surface-variant leading-relaxed">+91 98765 43210</p>
              </div>
            </div>

            <div className="glass-panel bg-surface-container/80 rounded-3xl p-6 border border-white/10">
              <h2 className="font-bold text-xl mb-4">Send a Message</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Name</label>
                  <input className="w-full rounded-2xl bg-slate-950/40 border border-slate-800 p-4 text-on-surface outline-none focus:border-green-500" type="text" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Email</label>
                  <input className="w-full rounded-2xl bg-slate-950/40 border border-slate-800 p-4 text-on-surface outline-none focus:border-green-500" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <label className="block text-slate-400 text-sm mb-2">Message</label>
                  <textarea className="w-full rounded-2xl bg-slate-950/40 border border-slate-800 p-4 text-on-surface outline-none focus:border-green-500" rows="5" placeholder="Tell us how we can help" />
                </div>
                <button type="button" className="w-full bg-primary text-on-primary rounded-2xl py-4 font-bold hover:bg-primary/90">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
