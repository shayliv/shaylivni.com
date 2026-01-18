export function Footer() {
  const currentYear = new Date().getFullYear()

  const socials = [
    { name: "GitHub", url: "#" },
    { name: "LinkedIn", url: "https://linkedin.com/in/shay-livni" },
    { name: "Twitter", url: "https://twitter.com/IvniShay" },
    { name: "Email", url: "mailto:shaylivni@outlook.com" },
  ]

  return (
    <footer className="border-t-4 border-foreground bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-heading font-bold uppercase mb-4">Not Shay</h3>
            <p className="text-lg leading-relaxed">Building the future, one line of code at a time.</p>
          </div>

          <div>
            <h4 className="text-xl font-heading font-bold uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-lg hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  About
                </a>
              </li>
              <li>
                <a href="#work" className="text-lg hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  Work
                </a>
              </li>
              <li>
                <a href="#contact" className="text-lg hover:text-accent transition-colors flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-heading font-bold uppercase mb-4">Connect</h4>
            <ul className="space-y-2">
              {socials.map((social, i) => (
                <li key={i}>
                  <a href={social.url} className="text-lg hover:text-accent transition-colors flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-foreground pt-8 text-center">
          <p className="text-lg font-heading">© {currentYear} Not Shay. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
