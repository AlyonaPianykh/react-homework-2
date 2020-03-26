const test = function () {
  var arg1 = 'test';
  console.log(arg1)

  const test2 = function () {
    console.log(arg1 + ' est 2')
  };

  return test2;
};



var a = test();
a();