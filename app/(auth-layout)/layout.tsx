import React from 'react';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import styles from '../Home.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthHeader />
      <div className={styles.container}>
        <main>{children}</main>
      </div>
      <AuthFooter />
    </>
  );
}
