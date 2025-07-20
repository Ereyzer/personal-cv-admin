import css from './avatar.module.css';

function Avatar({ imgUrl }) {
  return (
    <section>
      <div className={css['hero-img']}>
        <img src={imgUrl} />
      </div>
    </section>
  );
}

export default Avatar;
