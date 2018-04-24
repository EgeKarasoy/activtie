// @flow

import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Styles from './Styles/NavigationContainerStyle';
import NavigationDrawer from './NavigationDrawer';
import NavItems from './NavItems';

// screens identified by the router
import GateMonitorsScreen from '../Containers/GateMonitorsScreen';

/** *************************
 * Documentation: https://github.com/aksonov/react-native-router-flux
 ************************** */

class NavigationRouter extends Component<*> {
  render(): React$Element< * > {
    return (
      <Router>
        <Scene key="drawer" component={NavigationDrawer} open={false}>
          <Scene
            key="drawerChildrenWrapper"
            navigationBarStyle={Styles.navBar}
            titleStyle={Styles.title}
            leftButtonIconStyle={Styles.leftButton}
            rightButtonTextStyle={Styles.rightButton}
          >
            <Scene
              initial
              key="gateMonitorsScreen"
              component={GateMonitorsScreen}
              title="Ignite"
              renderLeftButton={NavItems.hamburgerButton}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

export default NavigationRouter;
