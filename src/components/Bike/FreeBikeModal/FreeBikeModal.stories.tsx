import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FreeBikeModal } from './FreeBikeModal';

export default {
  title: 'компоненты/bike',
  component: FreeBikeModal,
} as ComponentMeta<typeof FreeBikeModal>;

const Template: ComponentStory<typeof FreeBikeModal> = (args) => <FreeBikeModal {...args} />;

export const FreeBikeModalStory = Template.bind({});
FreeBikeModalStory.args = {
  bike: {
    name: 'Stels XT280 V010',
    cost: 320,
    _id: '1',
    img: '',
  },
};
