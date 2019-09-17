import React from 'react';
import s from './Nav.scss';
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom';
import { translate } from 'react-i18next';
import DocumentSend from 'wix-style-react/new-icons/DocumentSend';
import Phone from 'wix-style-react/new-icons/Phone';

class Nav extends React.Component {
  static propTypes = {
    t: PropTypes.func,
  };
  render() {
    const { t } = this.props;
    return (
      <nav className={s.nav}>
        <ul>
          <li><NavLink to="./tickets" activeClassName={s.active}><DocumentSend/>{t('app.tickets')}</NavLink></li>
          <li><NavLink to="./calls" activeClassName={s.active}><Phone/>{t('app.calls')}</NavLink></li>
        </ul>
      </nav>
    );
  }
}

export default translate()(Nav);
