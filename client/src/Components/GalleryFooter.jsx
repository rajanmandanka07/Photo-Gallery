const Footer = () => (
  <footer className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-800/50 h-16 flex items-center justify-center">
    <div className="container mx-auto px-4 sm:px-6" >
      <p className="text-gray-300 text-sm text-center">
        &copy; {new Date().getFullYear()} Photo Gallery. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;