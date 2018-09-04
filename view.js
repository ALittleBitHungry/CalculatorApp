var gameView = function () {

    return {

        el: (query) => {
            return document.querySelector(query);
        },

        allEl: function(query) {
            return document.querySelectorAll(query);
        },

        newEl: function(query) {
            return document.createElement(query);
        },

        allNumElements: function() {
            return this.allEl(".control-btn.num");
        },
      
        deleteButton: function() {
          return this.el('.control-btn.func.delete');
        },

        switchPlusMinusButton: function () {
            return this.el(".switch-positive-negative");
        },

        displayCurrentNumberElement: function() {
            return this.el(".current-number span");
        },

        displayCurrentEquationElement: function () {
            return this.el(".current-equation");
        },

        enableFloatModeButton: function() {
            return this.el(".control-btn.float");
        },

        mathOperationButtons: function () {
            return this.allEl(".math-op");
        },

        calculatePercentageValueButton: function () {
            return this.el(".percent");
        },

        finalizeEquationButton: function () {
            return this.el('.equal');
        },

        pastEquationsList: function () {
            return this.el('.past-equations-list');
        },

        clearPastEquationsListButton: function () {
            return this.el('.fas.fa-trash');
        },

        emptyPastEquationListPlaceholder: function () {
            return this.el('.empty-list-placeholder');
        },

        pastEquationHTMLNodes: function () {
            return this.allEl('.past-equation-item');
        },

        addWhiteSpaceToDisplayedNumbers: function(inputNum) {
            let isValueNegative = inputNum.match('-') ? true : false,
                tempArrayToExtractInteger = inputNum.split('.'),
                tempArrayToRemoveNegativeSign = tempArrayToExtractInteger[0].split('-'),
                tempArrayOnlyInteger = tempArrayToRemoveNegativeSign[tempArrayToRemoveNegativeSign.length - 1].split(''),
                tempArrayOnlyIntegerReversed = [];
            for (let i = 0; i < tempArrayOnlyInteger.length; i++) {
              tempArrayOnlyIntegerReversed.unshift(tempArrayOnlyInteger[i]);
            }
            tempArrayOnlyIntegerReversed = tempArrayOnlyIntegerReversed
              .reduce((arrayWithWhiteSpace, currentDigit) => {
                if (arrayWithWhiteSpace[0] && arrayWithWhiteSpace.filter(element => element !== " ").length % 3 === 0) {
                  arrayWithWhiteSpace.push(' ');
                }
                arrayWithWhiteSpace.push(currentDigit);
                return arrayWithWhiteSpace;
            }, []);
            tempArrayOnlyInteger = [];
            for (let i = 0; i < tempArrayOnlyIntegerReversed.length; i++) {
              tempArrayOnlyInteger.unshift(tempArrayOnlyIntegerReversed[i]);
            }
            
            let strFromTempOnlyIntegerArray = (isValueNegative) ? "-".concat(tempArrayOnlyInteger.join('')) : tempArrayOnlyInteger.join('');
            return (tempArrayToExtractInteger[1] !== undefined) ? strFromTempOnlyIntegerArray.concat(",", tempArrayToExtractInteger[1]) : strFromTempOnlyIntegerArray;
        
        },

        renderDisplayedNumber: function(inputNum) {
            this.displayCurrentNumberElement().textContent = this.addWhiteSpaceToDisplayedNumbers(inputNum); 
        },

        renderCurrentEquation: function (equation) {
            this.displayCurrentEquationElement().textContent = equation
                .map(element => {
                    let isElementNaN = String(Number(element)) === "NaN";
                    return (!isElementNaN) ? this.addWhiteSpaceToDisplayedNumbers(String(element)) : element;
                })
                .join(' ');
        },

        clearCurrentEquationFromDisplay: function () {
            this.displayCurrentEquationElement().textContent = '';
        },


        createPastEquationListItem: function (itemObject) {
            let pastResult = itemObject.result, 
                pastEquation = itemObject.equation
                    .split(' ')
                    .map(element => {
                        let isElementNaN = String(Number(element)) === "NaN";
                        return (!isElementNaN) ? this.addWhiteSpaceToDisplayedNumbers(String(element)) : element;
                    })
                    .join(' ');


            let pastEquationNode = document.createElement('p');
            pastEquationNode.classList.toggle('past-equation');
            pastEquationNode.textContent = `${pastEquation} =`;

            let pastEquationResultNode = document.createElement('p');
            pastEquationResultNode.classList.toggle('past-equation-result');
            pastEquationResultNode.textContent = pastResult;

            let pastEquationListNode = document.createElement('li');
            pastEquationListNode.classList.toggle('past-equation-item');
            pastEquationListNode.appendChild(pastEquationNode);
            pastEquationListNode.appendChild(pastEquationResultNode);

            if (this.pastEquationHTMLNodes().length) {
                let pastEquationItemDivideLine = document.createElement('div');
                pastEquationItemDivideLine.classList.toggle('past-equation-item-divide');
                pastEquationListNode.appendChild(pastEquationItemDivideLine);
            }
            

            return pastEquationListNode;
        },

        renderPastEquationListItem: function () {
            let newPastEquationHTMLItem = this.createPastEquationListItem(model.pastEquations[0]);
            if (!this.pastEquationHTMLNodes().length) {
                newPastEquationHTMLItem.classList.toggle('first');
                this.emptyPastEquationListPlaceholder().classList.toggle('hidden');
                this.pastEquationsList().classList.toggle('hidden');
                this.clearPastEquationsListButton().classList.toggle('hidden');
            }
            this.pastEquationsList().insertBefore(newPastEquationHTMLItem, this.pastEquationHTMLNodes()[0]);
        },

        animateNewPastEquationItemAddition: function () {
            let self = view;
            let newPastEquationHTMLItem = self.pastEquationHTMLNodes()[0];
            newPastEquationHTMLItem.addEventListener('transitionend', function (event) {
                if (event.propertyName === "max-height") {
                    console.log(event);
                    this.classList.toggle('show-content');
                }
            })
           
            newPastEquationHTMLItem.classList.toggle('full-height');
        }

    }
}