import css from './loading.module.css';
export default function Loading() {
  return (
    <div className={css.overlay}>
      <div className={css.loaderBox}>
        <span className={css.spinner}></span>
        <p className={css.text}>Завантаження...</p>
      </div>
    </div>
  );
}
