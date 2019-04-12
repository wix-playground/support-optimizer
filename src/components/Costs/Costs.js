import React, { Component } from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Input from 'wix-style-react/Input';
import Modal from 'wix-style-react/Modal';
import Dropdown from 'wix-style-react/Dropdown';
import { Layout, Cell } from 'wix-style-react/Layout';
import Label from 'wix-style-react/Label';
import {translate} from "react-i18next";
import s from './Costs.scss';

const timezones = [
  {
    id: 0,
    value: 'Kyiv(Ukraine)',
  },
  {
    id: 1,
    value: 'Dublin(Ireland)',
  },
  {
    id: 2,
    value: 'Tel Aviv(Israel)',
  },
  {
    id: 3,
    value: 'Los Angeles(USA)',
  },
  {
    id: 4,
    value: 'San Francisco(USA)',
  }
];

class Costs extends React.Component {
constructor() {
    super();
    this.state = {
      isOpenFullScreenModal: true,
    };
    this.costInput = React.createRef();
    this.supportInput = React.createRef();
    this.customerInput = React.createRef();
  }

  render() {
    const {onChange} = this.props;
    return (
      <form data-hook="costs-form">
        <Layout>
          <Cell span={7}>
            <Label size="medium">{'Quota'}</Label>
            <Input name={'quota'} type="number" suffix={<Input.Affix>$</Input.Affix>} errorMessage={'Should be number'} helpMessage={'Should be number'} required={true} onBlur={opt => onChange(opt.currentTarget)}/>
          </Cell>
          <Cell span={7}>
            <Label size="medium">{'Support Cost'}</Label>
            <Input  name={'support'} type="number" ref={this.costInput} suffix={<Input.Affix>$</Input.Affix>} errorMessage={'Should be number'} helpMessage={'Should be number'} required={true} onBlur={opt => onChange(opt.currentTarget)}/>
          </Cell>
          <Cell span={7}>
            <Label size="medium">{'Customer Waiting Cost'}</Label>
            <Input  name={'customer'} type="number" ref={this.customerInput} suffix={<Input.Affix>$</Input.Affix>} errorMessage={'Should be number'} helpMessage={'Should be number'} required={true} onBlur={opt => onChange(opt.currentTarget)}/>
          </Cell>
        </Layout>
      </form>
    );
  }
}

export default translate()(Costs);