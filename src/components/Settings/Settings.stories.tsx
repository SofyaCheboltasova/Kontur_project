import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SettingsComponent } from './SettingsComponent';

export default {
  title: 'компоненты/settings',
  component: SettingsComponent,
} as ComponentMeta<typeof SettingsComponent>;

const Template: ComponentStory<typeof SettingsComponent> = (args) => <SettingsComponent {...args} />;

export const SettingsStory = Template.bind({});
SettingsStory.args = {
  userData: {
    login: 'ivanov@gmail.com',
    cardRequisites: {
      number: '1234123412341234',
      date: '0121',
      cvv: '123',
    },
  },
};
