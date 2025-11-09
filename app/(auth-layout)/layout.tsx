import AuthFooter from '@/components/AuthFooter/AuthFooter';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import React from 'react';
import styles from './Auth.module.css';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <AuthHeader />
        <main className={styles.main}>{children}</main>
        <AuthFooter />
      </div>
    </div>
  );
}
