import React from 'react';
import { storiesOf } from '@storybook/react-native';

import AlertMessage from './AlertMessage';

storiesOf('AlertMessage')
  .add('Default', () => (
    <AlertMessage
      title={'ALERT ALERT'}
    />
  ));
