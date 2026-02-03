import React from 'react';
import { Stories, Posts, MiniProfile, Suggestion } from './';

export const HomeContent: React.FC = () => {
  return (
    <section className="md:mt-12 ">
      <main className="grid grid-cols-1 w-full sm:pt-1 md:grid-cols-2 sm:max-w-[470px] lg:max-w-[821px]  lg:grid-cols-3 container">
        <section className="col-span-1  md:col-span-2 md:mr-8 ">
          {/* max-w-[470px] */}
          <Stories />
          <Posts />
        </section>
        <section className="hidden lg:inline-grid lg:col-span-1">
          <div className="mt-12">
            {/* fixed */}
            <MiniProfile />
            <Suggestion />
          </div>
        </section>
      </main>
    </section>
  );
};
