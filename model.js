var gameModel = function () {

    let _currentResult = 0,
        _currentTypedValue = null,
        _currentValueTypedIntegerMode = true,
        _currentValueTypedFloatMode = false,
        _currentDisplayedValue = "0",
        _isDisplayedValueNegative = false;
        _readyForMathOperation = false,
        _mathOperationPerformed = false,
        _currentEquation = [],
        _currentEquationOperator = null,
        _currentEquationResult = null,
        _pastEquations = [],
        _isUserTyping = true,
        _newPastEquationObject = function (equation, result) {
            this.equation = equation;
            this.result = result;

            return this;
        }


    return {
        operate: function (inputA, inputB, operator) {
            switch (operator) {
                case "+":
                return inputA + inputB;
                break;
                case "-":
                return inputA - inputB;
                break;
                case "x":
                return inputA * inputB;
                break;
                case "/":
                return inputA / inputB;
            }
        },

        set currentDisplayedValue(input) {
            _currentDisplayedValue = input;
            view.renderDisplayedNumber(this.currentDisplayedValue);
        },

        get currentDisplayedValue() {
            return _currentDisplayedValue;
        },

        addCurrentTypedValueIntegerMode: function(input, event) {
            if (!_currentTypedValue && event.target.textContent === "0") {
                _currentTypedValue = input;
                this.currentDisplayedValue = _currentTypedValue;
            } else {
                (_currentTypedValue && Number(_currentDisplayedValue)) ? _currentTypedValue += input : _currentTypedValue = input;
                this.currentDisplayedValue = this.currentTypedValue;
            }
        },

        addCurrentTypedValueFloatMode: function(input) {
            if (!_currentTypedValue) {
                _currentTypedValue = "0";
                _currentTypedValue += input;
            } else {
                _currentTypedValue += input;
            }
            this.currentDisplayedValue = this.currentTypedValue;
        },

        testAddCurrentTypedValue: function(input) {
            (_currentTypedValue === null)  ? _currentTypedValue = input : _currentTypedValue += input;
        },

        testRemoveCurrentTypedValue: function() {
            (_currentTypedValue.length === 1 || (_isDisplayedValueNegative && _currentTypedValue.length === 2)) ? _currentTypedValue = "0" : _currentTypedValue = _currentTypedValue.slice(0, _currentTypedValue.length - 1);
            
        },

        testActivateFloatMode: function() {
            if (_currentTypedValue === null) {
                _currentTypedValue = "0.";
            } else {
                (_currentTypedValue.indexOf(".") < 0) ? _currentTypedValue = _currentDisplayedValue + "." : '';
            }
        },

        removeCurrentTypedValue: function() {
            if (_currentTypedValue.length === 1) {
                _currentTypedValue = null;
                this.currentDisplayedValue = "0";
            } else {
                let valueToRemove = _currentTypedValue.slice(_currentTypedValue.length - 1);
                if (valueToRemove === ".") {
                    this.currentValueTypedFloatMode = false;
                    this.currentValueTypedIntegerMode = true;
                }
                _currentTypedValue = _currentTypedValue.slice(0, _currentTypedValue.length - 1);
                this.currentDisplayedValue = this.currentTypedValue;
                (_currentTypedValue === "0") ? _currentTypedValue = null : "";
            }
        },

        resetCurrentTypedValue: function () {
            _currentTypedValue = null;
        },

        get currentTypedValue() {
            return _currentTypedValue;
        },

        get currentValueTypedIntegerMode() {
            return _currentValueTypedIntegerMode;
        },

        set currentValueTypedIntegerMode (input) {
            _currentValueTypedIntegerMode = input;
        },

        get currentValueTypedFloatMode() {
            return _currentValueTypedFloatMode;
        },

        set currentValueTypedFloatMode (input) {
            _currentValueTypedFloatMode = input;
        },

        get readyForMathOperation() {
            return _readyForMathOperation;
        },

        set readyForMathOperation(input) {
            _readyForMathOperation = input;
        },

        get mathOperationPerformed () {
            return _mathOperationPerformed;
        },

        set mathOperationPerformed (input) {
            _mathOperationPerformed = input;
        },

        get currentEquationResult() {
            return _currentEquationResult;
        },

        set currentEquationResult(input) {
            _currentEquationResult = input;
        }, 

        get currentEquationOperator () {
            return _currentEquationOperator;
        },

        set currentEquationOperator (input) {
            _currentEquationOperator = input;
        },

        addCurrentEquationElements: function (button, ...elements) {
            if (elements[1] === "=") {
                elements.pop();
            }
            _currentEquation.push(...elements);
            if (button.textContent === "=") {
                view.clearCurrentEquationFromDisplay();
            } else {
                view.renderCurrentEquation(_currentEquation);
            }
        },

        changeCurrentEquationOperator: function (input) {
            let currentOperatorIndex = _currentEquation.length - 1;
            _currentEquation.splice(currentOperatorIndex, 1, input);
            _currentEquationOperator = input;
            view.renderCurrentEquation(_currentEquation);
        },

        get currentEquation() {
            return _currentEquation;
        },

        userIsTyping: function() {
            _isUserTyping = true;
        },

        userEndedTyping: function () {
            _isUserTyping = false;
        },

        get isUserTyping() {
            return _isUserTyping;
        },

        get isDisplayedValueNegative () {
            return _isDisplayedValueNegative;
        },

        set isDisplayedValueNegative (input) {
            _isDisplayedValueNegative = input;
        },

        switchTypedValuePlusMinus: function () {
            if (_currentTypedValue !== null) {
                (_currentTypedValue.indexOf("-") === -1) ? _currentTypedValue = "-" + _currentTypedValue : _currentTypedValue = _currentTypedValue.slice(1);
            } else {
                (_currentDisplayedValue.indexOf("-") === -1) ? _currentDisplayedValue = "-" + _currentDisplayedValue : _currentDisplayedValue = _currentDisplayedValue.slice(1);
            }
        },

        calculatePercentageValue: function (percentageValue, modifiedNumber) {
            let negativeValueSign = (String(modifiedNumber).match("-")) ? String(modifiedNumber).match("-")[0] : "";
            return negativeValueSign + String(modifiedNumber * (percentageValue / 100));
        },

        createPastEquationObject: function (equation, result) {
            return _newPastEquationObject.call({}, equation, result)
        },

        addPastEquationObject: function (object) {
            _pastEquations.unshift(object);
            view.renderPastEquationListItem();
            window.setTimeout(view.animateNewPastEquationItemAddition, 200);
        },

        get pastEquations () {
            return _pastEquations;
        },

        resetCurrentEquationState: function () {
        _currentResult = 0;
        _currentTypedValue = null;
        _currentValueTypedIntegerMode = true;
        _currentValueTypedFloatMode = false;
        _isDisplayedValueNegative = false;
        _readyForMathOperation = false;
        _mathOperationPerformed = false;
        _currentEquation = [];
        _currentEquationOperator = null;
        _currentEquationResult = null;
        _isUserTyping = true;
        }

    }
}


