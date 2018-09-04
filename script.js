/* 

1. User needs to be able to type number and see it on the display:

- variable to store the currently typed number - done
- number rendered when typed - done
- accepts only numbers (decimal and float), "+" etc needs to be added/used in equation only - done

- if "0" is displayed, pressing "0" will not add anything, unless user clicks start typing float number - done
- when user click on a ".", he starts to type float number - done
- when user is typing float number, "." cannot be typed until user goes back to decimal - done
- when user deletes the ".", he goes back to typing decimal - done

- values must separated by a whitespace every 4 chars (examples: "1 234", "345 678" etc) - done

2. User needs to be able to perform mathematical equations and see curren equation above the displayed number (with current operator at the end of it)

- variables to store two numbers for the mathematical operations - done
- variable to store the information about current operation type - done
- variable to store the current equation result - done

- if current valueA is empty, pressing operator button will assign displayed number to valueA variable and wait for valueB before performing any math operation - done
- if valueB isn't defined, app will wait for the user to provide the number - pressing operator button will not trigger any action - done
- after every mathematical operation, current equation result will need to be assigned to valueA - done
- after every mathematical operation, valueB will be set to null - done
- after every mathematival operation, current equation value is assigned as the currently displayed number - done
- after every mathematical operation, if user will start typing her/his own number, current equation value will be replaced by user's input - for inputB as well as displayed number - done
- if float mode is on, performing mathematical operation will reverse the app back to integer mode - done

- current equation will start to be displayed as soon as user will press the operator button - done
- current equation will be rendered to the latest operator character, valueB will be displayed as the main number - done
- current equation will be stored as an array, however it will be rendered as text - done
- every chain of same of same precedense operations in the equation should be enclosed in parenthesis when displayed if a higher precendense operation is listed after them

- if user didn't typed another value after pressing the operator button, pressing the operator button will only change the current operation to be performed - done
- if displayed value is supposed to be a float, but no number is present after '.' (examples, "0." or "1."), the integer before '.' will be added
- at a start of the application, the initial "0" can be added to the equation - done


Typing scenarios:

  1. Addition:
    - user started the app, 0 is displayed, nothing is typed yet or the input has been deleted -> typing 0 should not give any effect, typing other numbers should result in replacing 0 with the number
    - user clicked on any number, while nothing has been typed yet or is just after a math operation and the result is displayed -> displayed number should be replaced with the typed number (even 0)

  a) 0 displayed -> pressing 0 will not give any result, other number will replace 0, pressing '.' will add it
  b) equation result is displayed -> any number will replace the result, even 0 | oressing '.' will display "0."
  c) a number other than 0 is displayed -> any pressed number will be added to it
  d) '.' is a part of the number -> any pressed number will be added after it

  2. Removal:

  a) "0." is displayed - deleting "." will result in only 0 being displayed (scenario "a" in addition scenarios)
  b) "5." (or different num other than 0) is displayed -> deleting "." will result with only the number displayed (scenario "b" in addition scenarios)
  c) "0" is displayed -> nothing will happen
  d) A number other than 0 is displayed ("5", "55" etc) -> if longer than one char, only the last char will be removed, if contains only one char, 0 will be displayed (scenario "a" in addition scenarios)

3. User needs to be able to siwtch between negative and positive value when typing the number

- it should work by removing/adding "minus" ('-') sign before the number
- it shouldn't work when "0" is displayed
- it should work even on displayed equation result
- if applied on displayed equation result, pressing any number will result in replacing the equation result with this number

4. User needs to be able to use percentage values with "%" button

Available scenarios:

1. Application in start up -> no equation result, no added number yet to the equation -> will result in 0
2. Current equation result displayed -> pressing "%" will result computing "equation%" from the current equation result
3. No result displayed, but number ryped -> pressing "%" will result in computing "typedNumber%" from the current equation result
4. No result yet, only one number in the current equation -> pressing "%" while typing the second number will result in computing "typedNumber%" from the first number in the equation

5. User needs to be able to finish the equation using "equal" button:

Prerequisites:

 1. HTML elements:
- container for the displayed past equations
  - customized scrollbar
  - placeholder "No history to display" when past equations list is empty
  - every new past equation added on top, as <li> element
  - if a past equation is added to the history for the first time, <ul> element is created as well
  - placeholder needs to be hidden when an <ul> is rendered
- "Dumpster" icon/button for clearing out the history
 - if history is cleared out, whole <ul> element is being removed/hidden and replaced with the placeholder

 1. View functions
 - should create new <li> element for every new past equation
 - should use addWhiteSpaces as well for the numbers in the equation
 - should controll how the lines are being breaked when displaying equation (so, no breake in middle of the number, for example)
 - for first past equation, should create <ul> container as well
 - new <li> should be first 0 height and hidden, right after that class change to expand it and show content and achieve nice push down animation for already present equations
 - 

 2. Model functions:
 - function to create an object that will contain data about past equation: equation and result
 - function to add the past equation object to an array, with "unshift" method, so every added equation will first one in the array
 - new array object function will call view function to update the display

 3. Controller functions
 - function that will:
  - call the model function for creating past equation object and will add it to the array -> 
   a) displayed number will be added as the last in the equation
   b) will call operate function and use the dispalyedNumber as valueB to calculate the result
   c) will call model function for adding the new past equation object to the array (past equation object added as argument)

6. User needs to be able to see a number with maximum 16 characters (excluding whitespaces and ',')
- if typed number will be 16 characters long, the typing function will stop to work
- if typed number will exceed the display, the size of the displayed number needs to be made smaller by the script
- if equation result will have more than 16 characters, it will be rounded by the script

7. User cannot divide by zero
- if user will try add zero when division operator will be chosen, it will not be possible
- if zero is the displayed number, the division operator button will be greyed out


*/



var controller = gameController();
var view = gameView();
var model = gameModel();

view.allNumElements()
  .forEach(button => {
    button.addEventListener('click', controller.testTypeNumber);
});

view.deleteButton().addEventListener('click', controller.testRemoveNumber);
view.enableFloatModeButton().addEventListener('click', controller.testActivateFloatMode);
view.switchPlusMinusButton().addEventListener('click', controller.switchTypedValuePlusMinus);
view.calculatePercentageValueButton().addEventListener('click', controller.calculatePercentageValue);

view.mathOperationButtons().forEach(button => {
  button.addEventListener('click', controller.addMathOperationValues);
  button.addEventListener('click', controller.performMathOperation);
  button.addEventListener('click', controller.changeCurrentOperator)
  button.addEventListener('click', controller.updateCurrentEquationStatus);
});

view.finalizeEquationButton().addEventListener('click', controller.addMathOperationValues);
view.finalizeEquationButton().addEventListener('click', controller.performMathOperation);
view.finalizeEquationButton().addEventListener('click', controller.updateCurrentEquationStatus);
view.finalizeEquationButton().addEventListener('click', controller.finalizeCurrentEquation);