export class Validator {

    static checkName(name) {
        let RegExpression = /^[a-zA-Z\s]*$/;
        let reE = /^[a-zа-я ,.'-]+$/i

        let re = new RegExp('[a-zA-ZА-Яа-я\s]*$');

        return reE.test(name);

    }

}