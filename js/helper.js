import {Data} from "./data.js";

export class Helper {

    static getDateFormat() {
        let date = new Date();
        let year = date.getFullYear();
        let day = date.getDate();
        let month = date.getMonth() + 1;

        return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`
    }

    static getFullNameArrayOfUsers(users) {
        let arr = [];
        for (let u of users) {
            arr.push(u._fullName);
            arr.push(u._phone);
        }
        return arr;
    }

    static getUserByName(name, phone = '') {
        let arr = [];
        if (phone === '') {

            arr.push(Data.getAllUsers().find(x => x._fullName === name));

        } else {
            arr.push(Data.getAllUsers().find(x => x._phone === phone));
        }
        return arr;

    }

    static isNumeric(str) {
        if (typeof str != "string") {
            return false
        } // we only process strings!
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    static getBookNameAuthorPublisherArray() {
        let books = Data.getAllBooks();
        let b = [];
        for (let book of books) {
            b.push(book._name);
            b.push(book._author);
            b.push(book._publisher);
        }
        let set = new Set(b);
        b = Array.from(set);
        return b;
    }

    static findType(str) {
        let books = Data.getAllBooks();
        let arr = [];
        let a = books.filter(x => x._name === str);
        let b = books.filter(x => x._author === str);
        let c = books.filter(x => x._publisher === str);
        if (a.length > 0) {

            arr = Array.from(a);
        } else if (b.length > 0) {
            arr = Array.from(b);
        } else if (c.length > 0) {
            arr = Array.from(c);
        }
        return arr;
    }

    static getVisitorBookBorrowdateArray() {
        let cards = Data.getAllCards();
        let c = [];
        for (let card of cards) {
            c.push(card._visitor);
            c.push(card._borrowDate);
            c.push(card._bookName);
        }

        let set = new Set(c);
        c = Array.from(set);
        return c;

    }

    static findTypeCards(str) {
        let cards = Data.getAllCards();
        let arr = [];
        let a = cards.filter(x => x._visitor === str);
        let b = cards.filter(x => x._borrowDate === str);
        let c = cards.filter(x => x._bookName === str);

        if (a.length > 0) {

            arr = Array.from(a);
        } else if (b.length > 0) {
            arr = Array.from(b);
        } else if (c.length > 0) {
            arr = Array.from(c);
        }
        return arr;
    }
}