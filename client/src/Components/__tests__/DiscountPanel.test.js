const handleInputChangeMock = (
  index,
  value,
  guestsFee,
  setGuestsFee,
  setInitialInputs
) => {
  const newInputValues = [...guestsFee];

  newInputValues[index] = value;

  setGuestsFee(newInputValues);

  setInitialInputs(newInputValues);
};

test('handleInputChange changes guestsFee values in array', () => {
  const initialGuestsFee = [0, 0, 0];
  const setGuestsFeeMock = jest.fn();
  const setInitialInputsMock = jest.fn();

  handleInputChangeMock(
    1,
    10,
    initialGuestsFee,
    setGuestsFeeMock,
    setInitialInputsMock
  );

  expect(setGuestsFeeMock).toHaveBeenCalledWith([0, 10, 0]);

  expect(setInitialInputsMock).toHaveBeenCalledWith([0, 10, 0]);
});

const changeValuePercentageMock = (
  index,
  percentage,
  guestsFee,
  initialInputs,
  setGuestsFee,
  setTotal,
  total
) => {
  if (guestsFee === initialInputs) {
    const newInputs = [...guestsFee];
    const newValue = (newInputs[index] * (1 + percentage / 100)).toFixed(2);

    const diff = newValue - newInputs[index];
    newInputs[index] = parseFloat(newValue);

    setGuestsFee(newInputs);
    setTotal(total + parseFloat(diff));
  } else {
    const initialValue = [...initialInputs];
    const newInputs = [...guestsFee];
    const newValue = (initialValue[index] * (1 + percentage / 100)).toFixed(2);
    const diff = newValue - newInputs[index];
    newInputs[index] = parseFloat(newValue);
    setGuestsFee(newInputs);
    setTotal(total + parseFloat(diff));
  }
};

test('changeValuePercentage changes guestsFee values by given percent', () => {
  const initialGuestsFee = [10, 20, 30];
  const initialInputs = [10, 20, 30];
  const total = 0;
  const setGuestsFeeMock = jest.fn();
  const setTotalMock = jest.fn();

  changeValuePercentageMock(
    1,
    10,
    initialGuestsFee,
    initialInputs,
    setGuestsFeeMock,
    setTotalMock,
    total
  );

  expect(setGuestsFeeMock).toHaveBeenCalledWith([10, 22, 30]);

  expect(setTotalMock).toHaveBeenCalledWith(2);
});
