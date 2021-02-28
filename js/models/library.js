

export class Library {

    constructor(books, name, users, cards) {
        this._books = books;
        this._name = name;
        this._users = users;
        this._cards = cards
    }

    /*Methods*/

    addUser(user) {
        this._users.push(user);
    }

    addBook(book) {
        this._books.push(book);
    }

    addCard(card) {
        this._cards.push(card);
    }




}