var gameController = function () {

    return {
        
        typeNumber: function(event) {
          (model.currentValueTypedIntegerMode) ? model.addCurrentTypedValueIntegerMode(this.textContent, event) :
          (model.currentValueTypedFloatMode) ? model.addCurrentTypedValueFloatMode(this.textContent) : "";
          model.userIsTyping();
          
        },

        testTypeNumber: function () {
          model.userIsTyping();
          model.testAddCurrentTypedValue(this.textContent);
          model.currentDisplayedValue = model.currentTypedValue;
          if (model.currentDisplayedValue === "0") {
            model.resetCurrentTypedValue();
          }
        },
        
        removeNumber: function() {
          model.removeCurrentTypedValue();
          model.userIsTyping();
        },

        testRemoveNumber: function() {
          if (model.isUserTyping && model.currentTypedValue !== null) {
            model.userIsTyping();
            model.testRemoveCurrentTypedValue();
            model.currentDisplayedValue = model.currentTypedValue;
            if (model.currentDisplayedValue === "0") {
              model.isDisplayedValueNegative = false;
              model.resetCurrentTypedValue();
            }
          }
        },

        activateTypingInFloatMode: function() {
          if (!model.currentTypedValue || model.currentTypedValue.indexOf(".") === -1) {
            model.currentValueTypedIntegerMode = false;
            model.currentValueTypedFloatMode = true;
            model.addCurrentTypedValueFloatMode(".");
            model.userIsTyping();
          }

        },

        testActivateFloatMode: function () {
          model.userIsTyping();
          model.testActivateFloatMode();
          model.currentDisplayedValue = model.currentTypedValue;
        },

        addMathOperationValues: function () {
            if (model.isUserTyping || model.currentEquation[0] === undefined || this.textContent === "=") {
              model.addCurrentEquationElements(this, Number(model.currentDisplayedValue), this.textContent);
              if (!model.currentEquationOperator && this.textContent !== "=") {
                model.currentEquationOperator = this.textContent;
              }
              model.resetCurrentTypedValue();
              (model.currentEquation.length >= 3) ? model.readyForMathOperation = true : "";
              model.userEndedTyping();
            }
          },
          
          performMathOperation: function () {
            if (model.readyForMathOperation) {
              console.log("length check worked");
              let currentEquationValuesOnly = model.currentEquation.filter(arrayElement => String(arrayElement).match(/\d/)),
                  currentEquationOperatorsOnly = model.currentEquation.filter(arrayElement => String(arrayElement).match(/\D/)),
                  currentValueA = (String(model.currentEquationResult) !== "null") ? model.currentEquationResult : currentEquationValuesOnly[0],
                  currentValueB = currentEquationValuesOnly[currentEquationValuesOnly.length - 1],
                  operator = model.currentEquationOperator;
                  console.log(...[currentValueA, currentValueB, operator]);
                  model.currentEquationResult = model.operate(currentValueA, currentValueB, operator);
                  model.mathOperationPerformed = true;

            } 
        },

        updateCurrentEquationStatus: function() {
          if (model.mathOperationPerformed) {
            let currentEquationOperatorsOnly = model.currentEquation.filter(arrayElement => String(arrayElement).match(/\D/));
            model.currentEquationOperator = currentEquationOperatorsOnly[currentEquationOperatorsOnly.length - 1];
            model.currentDisplayedValue = String(model.currentEquationResult);
            model.readyForMathOperation = false;
            model.mathOperationPerformed = false;
            model.resetCurrentTypedValue();
            model.currentValueTypedFloatMode = false;
            model.currentValueTypedIntegerMode = true;
            model.userEndedTyping();
          }
        },

        changeCurrentOperator: function () {
          if (!model.isUserTyping) {
              model.changeCurrentEquationOperator(this.textContent);
          }
      },

      switchTypedValuePlusMinus: function() {
        if (Number(model.currentDisplayedValue)) {
          model.userIsTyping();
          model.switchTypedValuePlusMinus();
          (model.currentTypedValue !== null) ? model.currentDisplayedValue = model.currentTypedValue : model.currentDisplayedValue = model.currentDisplayedValue;
          (model.currentDisplayedValue.match("-")) ? model.isDisplayedValueNegative = true : model.isDisplayedValueNegative = false;
        }
      },

      calculatePercentageValue: function () {
        let calculatedValue = model.currentDisplayedValue;
        model.userIsTyping();
        model.resetCurrentTypedValue();
        if (String(model.currentEquationResult).match(/\d/)) {
          model.currentDisplayedValue = model.calculatePercentageValue(calculatedValue, model.currentEquationResult);
        } else if (model.currentEquation.length === 2) {
          model.currentDisplayedValue = model.calculatePercentageValue(calculatedValue, model.currentEquation[0]);
        } else {
          model.currentDisplayedValue = "0";
        }
      },
      
      finalizeCurrentEquation: function () {
          let newPastEquationObject = model.createPastEquationObject(model.currentEquation.join(' '), String(model.currentDisplayedValue));
          model.addPastEquationObject(newPastEquationObject);
          model.resetCurrentEquationState();
        }
    }


}    