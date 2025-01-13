export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-4 px-6 mt-auto">
      <div className="max-w-7xl mx-auto text-sm">
        <p>&copy; {new Date().getFullYear()} Multi-Lingua Dashboard. All rights reserved.</p>
      </div>
    </footer>
  );
};