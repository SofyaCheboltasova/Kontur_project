import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RentedModal } from './RentedModal';

export default {
  title: 'компоненты/bike',
  component: RentedModal,
} as ComponentMeta<typeof RentedModal>;

const Template: ComponentStory<typeof RentedModal> = (args) => <RentedModal {...args} />;

export const RentedModalStory = Template.bind({});
RentedModalStory.args = {
  bike: {
    name: 'Stels XT280 V010',
    cost: 320,
    _id: '1',
    img: '',
  },
};
