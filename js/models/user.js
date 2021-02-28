import {Helper} from "../helper.js";
import {Data} from "../data.js";
import {DataSaver} from "../dataSaver.js";
import {Library} from "./library.js";

export class User {

    constructor(id, fullName, phone, read, borrowed,) {
        this._id = id;
        this._fullName = fullName;
        this._phone = phone;

        this._readBooks = read;
        this._borrowedBooks = borrowed
    }

    static traverseBook(id) {

        //1 найти карточку

        let cards = Data.getAllCards();
        let card =cards.find(x=>x._id==id);
        let cardIndex = cards.indexOf(card);

        //2 Найти пользователя

        let users = Data.getAllUsers();
        let user = users.find(x=>x._fullName===card._visitor)
        let userIndex = users.indexOf(user)

        let bookName = cards[cardIndex]._bookName;
        //1 узнать id книги
        let books = Data.getAllBooks();
        let book = books.find(x => x._name === bookName);

        //2 скопировать книгу в read arr
        users[userIndex]._readBooks.push(book._id);
        //3 удалить с borrowedBooks
        let index = users[userIndex]._borrowedBooks.indexOf(book._id);
        users[userIndex]._borrowedBooks.splice(index, 1);
        //4 change date
        cards[cardIndex]._returnDate = Helper.getDateFormat();

        //5 Cохранить список читателе, список карточек
        DataSaver.saveData(new Library(books,"Slavic Bridge", users, cards))

    }

}