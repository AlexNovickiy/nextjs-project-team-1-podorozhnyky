import { Nunito_Sans } from 'next/font/google';

export const nunitoSans = Nunito_Sans({
  subsets: ['cyrillic', 'latin'],
  weight: ['400', '500', '600', '700'], // Regular, Medium, SemiBold
  display: 'swap',
  variable: '--font-nunito-sans', // Для CSS
});
