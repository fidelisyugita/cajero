interface CalculatorState {
  currentValue: string;
  operator: string | null;
  previousValue: string | null;
}

export const handleNumber = (
  value: string,
  state: CalculatorState,
): CalculatorState => {
  if (state.currentValue === '0') {
    return {
      currentValue: `${value}`,
      operator: state.operator,
      previousValue: state.previousValue,
    };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
    operator: state.operator,
    previousValue: state.previousValue,
  };
};

export const initialState: CalculatorState = {
  currentValue: '0',
  operator: null,
  previousValue: null,
};

const handleEqual = (state: CalculatorState): CalculatorState => {
  const {currentValue, operator, previousValue} = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue || '0');
  const resetState: CalculatorState = {
    currentValue: '0',
    operator: null,
    previousValue: null,
  };

  switch (operator) {
    case '+':
      return {
        currentValue: `${previous + current}`,
        ...resetState,
      };
    case '-':
      return {
        currentValue: `${previous - current}`,
        ...resetState,
      };
    case '*':
      return {
        currentValue: `${previous * current}`,
        ...resetState,
      };
    case '/':
      return {
        currentValue: `${previous / current}`,
        ...resetState,
      };
    default:
      return state;
  }
};

type CalculatorActionType =
  | 'number'
  | 'clear'
  | 'posneg'
  | 'percentage'
  | 'operator'
  | 'equal';

const calculator = (
  type: CalculatorActionType,
  value: string,
  state: CalculatorState,
): CalculatorState => {
  switch (type) {
    case 'number':
      return handleNumber(value, state);
    case 'clear':
      return initialState;
    case 'posneg':
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`,
        operator: state.operator,
        previousValue: state.previousValue,
      };
    case 'percentage':
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`,
        operator: state.operator,
        previousValue: state.previousValue,
      };
    case 'operator':
      return {
        currentValue: '0',
        operator: value,
        previousValue: state.currentValue,
      };
    case 'equal':
      return handleEqual(state);
    default:
      return state;
  }
};

export default calculator;
