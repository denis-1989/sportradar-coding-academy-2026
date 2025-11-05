import './globals.scss';
import Footer from './components/Footer';
import Header from './components/Header';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Sport Calendar',
  description: 'Sportradar FE task demo - events calendar',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="container mt-4">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
