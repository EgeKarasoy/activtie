// @flow

type TestType = {
  num: number
};

const testFunc = (kayhan: TestType) => {
  alert(kayhan.num + 4);
};

testFunc({ num: 5 });
