import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import { i18n } from './i18n';

import './styles/normalize.css';
import './styles/main.css';

i18n.init();

render(<App />, document.getElementById('app-root'));
