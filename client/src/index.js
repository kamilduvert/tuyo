// == Import : npm
import React from 'react';
import { render } from 'react-dom';

// == Import : local
// Composants
import App from './components/App'

import './styles/index.scss';

// == Render
const rootReactElement = <App />;
const target = document.getElementById('root');
render(rootReactElement, target);