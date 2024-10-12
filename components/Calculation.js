export const operators = ['*', '/', '+', '-', '%', '.', '×',"÷"];

export function calculate(currentOperand) {
   if(typeof currentOperand == "string"){
     let currentResult = currentOperand;
   if (currentResult.length == null && currentResult.length == undefined) {
     return '';
   } else {
     let lastChar = currentResult.charAt(currentResult.length - 1);
     if (operators.includes(lastChar)) {
       return '';
     } else {
       try {
         let evaluations = eval(
           currentOperand.replace(/÷/g, '/').replace(/×/g, '*')
         );
         if (Number.isInteger(evaluations)) {
           return evaluations;
         } else {
           return evaluations.toFixed(4);
         }
       } catch (error) {
         if (currentOperand == '') return '';
         return 'ERROR';
       }
     }
   }
   }
 }