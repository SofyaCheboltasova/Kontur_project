import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from './Footer';

export default {
  title: 'компоненты/footer',
  component: Footer,
} as ComponentMeta<typeof Footer>;

const Template: ComponentStory<typeof Footer> = (args) => <Footer {...args} />;

export const FooterStory = Template.bind({});
FooterStory.args = {
  company: 'СКБ Контур',
  year: 'с 1988 года',
  docs: 'Правовые документы',
  docsLink: '#',
};
