import LangugeList from './Languages';

function MultiLangugeItem({ title, data, Item, patchData }) {
  return (
    <section id={title.toLowerCase()}>
      <h2>{title}</h2>
      <LangugeList obj={data[title.toLowerCase()]} TextComponent={Item} patchData={patchData} />
    </section>
  );
}

export default MultiLangugeItem;
