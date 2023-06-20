// Use the injection zone in a view

import { InjectionZone } from '@strapi/helper-plugin';

const HomePage = () => {
  return (
    <main>
      <h1>This is the homepage</h1>
        <InjectionZone area="marking-point-image.homePage.right" />
    </main>
  );
};