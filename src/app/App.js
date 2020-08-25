import React, { Component } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import Input from '../components/Input';
import InputReadonly from '../components/InputReadonly';
import { calculateSalaryFrom } from '../js/salary';
import {
  formatCurrency,
  formatPerc,
  formatPercIng,
} from '../helpers/formaterhelpers';
import Bar from '../components/Bar';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      salariobruto: '',
      baseINSS: 0,
      discontoINSS: 0,
      percInss: '',
      baseIRPF: 0,
      discontoIRPF: 0,
      percIrrf: '',
      netSalario: 0,
      percLiquido: '',
      barInss: 0,
      barIrpf: 0,
      barLiquido: 0,
    };
  }

  handleValue = (newValue) => {
    const {
      baseINSS,
      discountINSS,
      baseIRPF,
      discountIRPF,
      netSalary,
    } = calculateSalaryFrom(newValue);
    let perInss = '';
    let perIrpf = '';
    let perLiquido = '';
    if (discountINSS > 0 && baseINSS > 0) {
      perInss = formatPerc((discountINSS / newValue) * 100);
      perInss = `(${perInss})`;
    }
    if (discountIRPF > 0 && baseIRPF > 0) {
      perIrpf = formatPerc((discountIRPF / newValue) * 100);
      perIrpf = `(${perIrpf})`;
    }
    if (netSalary > 0 && newValue > 0) {
      perLiquido = formatPerc((netSalary / newValue) * 100);
      perLiquido = `(${perLiquido})`;
    }

    this.setState({
      salariobruto: newValue,
      baseINSS: formatCurrency(baseINSS),
      discontoINSS: formatCurrency(discountINSS),
      baseIRPF: formatCurrency(baseIRPF),
      discontoIRPF: formatCurrency(discountIRPF),
      netSalario: formatCurrency(netSalary),
      percInss: perInss,
      percIrrf: perIrpf,
      percLiquido: perLiquido,
      barInss: (discountINSS / newValue) * 100,
      barIrpf: (discountIRPF / newValue) * 100,
      barLiquido: (netSalary / newValue) * 100,
    });
  };

  render() {
    const {
      salariobruto,
      baseINSS,
      discontoINSS,
      baseIRPF,
      discontoIRPF,
      netSalario,
      percInss,
      percIrrf,
      percLiquido,
      barInss,
      barIrpf,
      barLiquido,
    } = this.state;
    return (
      <div className="container">
        <h1
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Calculo Salário
        </h1>
        <div className={'row'}>
          <Input
            placeholder="Valor do salário"
            type="number"
            title="Salário bruto:"
            id="salariobruto"
            name="salariobruto"
            classe="input-field col s6"
            value={salariobruto}
            onchange={this.handleValue}
          />
        </div>
        <div className={'row'}>
          <InputReadonly
            stilo="baseinss"
            type="text"
            title="Base INSS:"
            id="baseinss"
            name="baseinss"
            classe="input-field col s3"
            value={baseINSS}
          />
          <InputReadonly
            stilo="descontoinss"
            type="text"
            title="Desconto INSS:"
            id="descontoinss"
            name="descontoinss"
            classe="input-field col s3"
            value={`${discontoINSS} ${percInss} `}
          />
          <InputReadonly
            stilo="baseirrf"
            type="text"
            title="Base IRRF:"
            id="baseirrf"
            name="baseirrf"
            classe="input-field col s3"
            value={baseIRPF}
          />
          <InputReadonly
            stilo="descontoirrf"
            type="text"
            title="Desconto IRRF:"
            id="descontoirrf"
            name="descontoirrf"
            classe="input-field col s3"
            value={`${discontoIRPF} ${percIrrf} `}
          />
        </div>
        <div className={'row'}>
          <InputReadonly
            stilo="salarioliquido"
            type="text"
            title="Salário liquido:"
            id="salarioliquido"
            name="salarioliquido"
            classe="input-field col s6"
            value={`${netSalario} ${percLiquido}`}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Bar
            title={`Desconto do INSS ${discontoINSS}`}
            value={formatPercIng(barInss)}
            color="#e67e22"
          />
          <Bar
            title={`Desconto do IRPF ${discontoIRPF}`}
            value={formatPercIng(barIrpf)}
            color="#c0392b"
          />
          <Bar
            title={`Valor liquído ${netSalario}`}
            value={formatPercIng(barLiquido)}
            color="#16a085"
          />
        </div>
      </div>
    );
  }
}
