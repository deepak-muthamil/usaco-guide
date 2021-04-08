import * as React from 'react';
import '../src/styles/main.css';
import '../src/styles/components.css';
import '../src/styles/tailwindcss-utils.css';
import '../src/styles/anchor.css';
import { DarkModeContext } from '../src/context/DarkModeContext';
import { action } from '@storybook/addon-actions';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  renderStory => (
    <div className="grid xl:grid-cols-2 -m-4 min-h-screen">
      <div className="p-6">
        <h1 className="text-gray-800 text-2xl font-bold">Light Mode</h1>
        <div className="h-4" />
        <DarkModeContext.Provider value={false}>
          {renderStory()}
        </DarkModeContext.Provider>
      </div>
      <div className="bg-dark-surface p-6 dark h-full">
        <h1 className="text-gray-100 text-2xl font-bold">Dark Mode</h1>
        <div className="h-4" />
        <DarkModeContext.Provider value={true}>
          {renderStory()}
        </DarkModeContext.Provider>
      </div>
    </div>
  ),
];

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// This global variable is prevents the "__BASE_PATH__ is not defined" error inside Storybook.
global.__BASE_PATH__ = '/';
// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.
window.___navigate = pathname => {
  action('NavigateTo:')(pathname);
};
