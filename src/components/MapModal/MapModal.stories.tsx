import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MapModal } from './MapModal';

export default {
  title: 'компоненты/map',
  component: MapModal,
} as ComponentMeta<typeof MapModal>;

const Template: ComponentStory<typeof MapModal> = () => <MapModal />;

export const MapModalStory = Template.bind({});
MapModalStory.args = {
  bikeName: 'Stels XT280 V010',
};
