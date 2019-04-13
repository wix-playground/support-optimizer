import React, { Component } from 'react';
import Input from 'wix-style-react/Input';
import Label from 'wix-style-react/Label';
import { translate } from "react-i18next";
import { Row } from "wix-style-react/dist/src/Grid";


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

class Costs extends Component {
  constructor() {
      super();
      this.state = {
        isOpenFullScreenModal: true,
      };
  }

  render() {
    const { onChange, costs: { customerWaitingCost, quota, supportCost }} = this.props;

    return (
     <>
        <Row>
          <Label size="medium" for="quota">
            Quota
          </Label>
          <Input
            name="quota"
            type="number"
            value={quota}
            suffix={<Input.Affix>$</Input.Affix>}
            onChange={onChange}
          />
        </Row>
        <Row>
          <Label
            size="medium"
            for="supportCost"
          >
            Support Cost
          </Label>
          <Input
            name="supportCost"
            value={supportCost}
            type="number"
            suffix={<Input.Affix>$</Input.Affix>}
            onChange={onChange}
          />
        </Row>
        <Row>
          <Label size="medium" for="customerWaitingCost">
            Customer Waiting Cost
          </Label>
          <Input
            name="customerWaitingCost"
            type="number"
            value={customerWaitingCost}
            suffix={<Input.Affix>$</Input.Affix>}
            onChange={onChange}
          />
        </Row>
      </>
    );
  }
}

export default translate()(Costs);
