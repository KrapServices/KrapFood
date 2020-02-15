import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Visibility,
} from 'semantic-ui-react';
import './layout.css';

const getWidth = () => {
  const isSSR = typeof window === 'undefined';
  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export default class TopBar extends Component {
  render() {
    const { children } = this.props;

    return (
      <div>
        <Responsive
          getWidth={getWidth}
          minWidth={Responsive.onlyTablet.minWidth}
        >
          <Visibility once onBottomPassedReverse={this.hideFixedMenu}>
            <Grid
              style={{
                minHeight: 20,
                backgroundColor: '#fc475f',
                marginBottom: '1rem',
              }}
              columns={3}
              centered
            >
              <Grid.Row centered>
                <Grid.Column textAlign="left" verticalAlign="bottom">
                  <p style={{ marginLeft: '1em' }}>
                    <Header as={Link} to="/">
                      <Icon name="road" />
                      KrapFood
                    </Header>
                  </p>
                </Grid.Column>
                <Grid.Column textAlign="center">
                  {' '}
                  <Menu
                    borderless
                    secondary
                    size="small"
                    compact
                    style={{ marginleft: 'auto', marginRight: 'auto' }}
                  >
                    <Menu.Item as={Link} to="/" fitted>
                      Home
                    </Menu.Item>
                  </Menu>
                </Grid.Column>
                <Grid.Column></Grid.Column>
              </Grid.Row>
            </Grid>
          </Visibility>
          <Container fluid className="site">
            <div className="site-content">{children}</div>
          </Container>
          {/* footer */}
          <Segment
            style={{ margin: '5em 0em 0em', padding: '5em 0em' }}
            vertical
          />
        </Responsive>
      </div>
    );
  }
}

TopBar.propTypes = {
  children: PropTypes.node.isRequired,
};
