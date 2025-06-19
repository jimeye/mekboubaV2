import { Inter, Lilita_One } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';

const inter = Inter({ subsets: ['latin'] });
const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
});

export const metadata = {
  title: 'Mekbouba Restaurant',
  description: 'Restaurant tunisien authentique',
};
 
export default function RootLayout({ children }) {
 return (
    <html lang="fr">
      <body className={`${inter.className} ${lilitaOne.variable}`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
