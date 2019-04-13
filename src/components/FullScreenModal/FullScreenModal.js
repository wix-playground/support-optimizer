import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Modal from 'wix-style-react/Modal';
import Dropdown from 'wix-style-react/Dropdown';
import Label from 'wix-style-react/Label';
import {translate} from "react-i18next";
import s from './FullScreenModal.scss';

const timezones = [
  {id: 0, value: 'Kyiv (Ukraine)'},
  {id: 1, value: 'Dublin (Ireland)'},
  {id: 2, value: 'Tel Aviv (Israel)'},
  {id: 3, value: 'Los Angeles (USA)'},
  {id: 4, value: 'San Francisco (USA)'},
];

class FullScreenModal extends React.Component {
constructor() {
    super();
    this.state = {
      isOpenFullScreenModal: true,
      error: false
    };
    this.onModalClose = this.onModalClose.bind(this);
    this.onDropDownSelect = this.onDropDownSelect.bind(this);
  }

  onModalClose () {
    return this.props.selected ? this.setState({ isOpenFullScreenModal: false, error: false }) : this.setState({ error: true });
  }

  onDropDownSelect (option) {
    this.setState({ error: false });
    this.props.onSelect(option);

  }
  render() {
    const { t } = this.props;
    const { error } = this.state;
    return (
      <Modal
        isOpen={this.state.isOpenFullScreenModal}
        onRequestClose={this.onModalClose}
        contentLabel={t('app.modal_heading')}
      >
        <MessageBoxFunctionalLayout
          confirmText={t('app.modal_ok')}
          dataHook="fullscreen-modal"
          onOk={this.onModalClose}
          theme="blue"
          title={t('app.modal_heading')}
        >
          <Label size="medium">
            Time Zone
          </Label>
          <Dropdown
            name={'timezone'}
            onSelect={option => this.onDropDownSelect(option)}
            options={timezones}
            autoFocus={true}
            error={error}
          />
          { error
            ? <p className="error">Please select time zone</p>
            : null
          }
        </MessageBoxFunctionalLayout>
      </Modal>
    );
  }
}

export default translate()(FullScreenModal);
