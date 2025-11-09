import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import styles from '../Home.module.css';
import style from '@/app/(auth-layout)/Auth.module.css';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={style.pageWrapper}>
      <div className={styles.container}>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
