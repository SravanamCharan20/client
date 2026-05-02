import './globals.css';

export const metadata = {
  title: 'DesignCode - System Design Practice',
  description: 'Practice system design problems with interactive structured answers and AI feedback.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
