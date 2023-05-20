import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';

export default {
  title: 'компоненты/кнопка',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ButtonDefault = Template.bind({});
ButtonDefault.args = {
  children: 'Войти',
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
  children: 'Войти',
  disabled: true,
};
