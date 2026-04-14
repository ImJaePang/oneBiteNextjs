import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';

export default function Home() {
  return (
    <div>
      <section>
        <h3></h3>
      </section>
      <section></section>
    </div>
  );
}
 

Home.getLayout = (page : ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}