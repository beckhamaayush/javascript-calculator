var Application = require('backbone.marionette').Application;
var Display = require('../display/display');
var Keypad = require('../keypad/keypad');
var isValidKey = require('./isValidKey');
var calculateResult = require('./calculateResult');

var calculator = module.exports = new Application();
var display = new Display();
var keypad = new Keypad();

calculator.addInitializer(function () {
    calculator.addRegions({
        display: '#display',
        keypad: '#keypad'
    });
    calculator.display.show(display);
    calculator.keypad.show(keypad);
});

keypad.on('keyPress', function (key) {
    var equation = display.getText();
    if (isValidKey(equation, key)) {
        switch (key.get('type')) {
        case 'clear':
            equation = '';
            break;
        case 'equals':
            equation = calculateResult(equation);
            break;
        default:
            equation += key.get('value');
        }
    }
    display.setText(equation);
});