import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FreeBikeLine } from './FreeBikeLine';

export default {
  title: 'компоненты/bike',
  component: FreeBikeLine,
} as ComponentMeta<typeof FreeBikeLine>;

const Template: ComponentStory<typeof FreeBikeLine> = (args) => <FreeBikeLine {...args} />;

export const FreeBikeLineStory = Template.bind({});
FreeBikeLineStory.args = {
  bike: {
    name: 'Stels XT280 V010',
    cost: 320,
    _id: '1',
    img: '',
  },
};
