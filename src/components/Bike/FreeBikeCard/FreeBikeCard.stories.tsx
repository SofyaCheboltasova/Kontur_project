import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FreeBikeCard } from './FreeBikeCard';

export default {
  title: 'компоненты/bike',
  component: FreeBikeCard,
} as ComponentMeta<typeof FreeBikeCard>;

const Template: ComponentStory<typeof FreeBikeCard> = (args) => <FreeBikeCard {...args} />;

export const FreeBikeCardStory = Template.bind({});
FreeBikeCardStory.args = {
  bike: {
    name: 'Stels XT280 V010',
    cost: 320,
    _id: '1',
    img: '',
  },
};
