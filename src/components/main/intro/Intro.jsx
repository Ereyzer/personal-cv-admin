import LangugeList from '../lenguages/Languages';
import IntroItem from './IntroItem';

function Intro({ data, patchData }) {
  return (
    <section id="intro">
      <h2>Intro</h2>
      <LangugeList obj={data.intro} TextComponent={IntroItem} setIntro={patchData} />
    </section>
  );
}

export default Intro;
