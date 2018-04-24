// @flow

import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import {
  DefaultRenderer,
  Actions as NavigationActions,
} from 'react-native-router-flux';
import { connect } from 'react-redux';
import DrawerContent from '../Containers/DrawerContent';
import Styles from './Styles/NavigationDrawerStyle';

/** ******************
 * Documentation: https://github.com/root-two/react-native-drawer
 ******************* */

type NavigationDrawerPropType = {
  navigationState: {
    children: Array< mixed >,
    key: mixed,
    open: mixed
  },
  onNavigate: () => {}
};

class NavigationDrawer extends Component<NavigationDrawerPropType> {
  render(): React$Element< * > {
    const state = this.props.navigationState;
    const { children } = this.props.navigationState;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        open={state.open}
        onOpen={(): mixed =>
          NavigationActions.refresh({ key: state.key, open: true })
        }
        onClose={() =>
          NavigationActions.refresh({ key: state.key, open: false })
        }
        content={<DrawerContent />}
        styles={Styles}
        tapToClose
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio: number): mixed => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
      >
        <DefaultRenderer
          navigationState={children[0]}
          onNavigate={this.props.onNavigate}
        />
      </Drawer>
    );
  }
}

export default connect(null, null)(NavigationDrawer);
