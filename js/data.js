import {Book} from "./models/book.js";
import {User} from "./models/user.js";
import {Card} from "./models/card.js";
import {DataSaver} from "./dataSaver.js";

export class Data {

    static initBooks() {
        let b1 = new Book(1, "Pride and Prejudice", 'Jane Austen', '1813', 'Penguin', 300, 3,);
        let b2 = new Book(2, "To Kill a Mockingbird", 'Harper Lee', '1960', 'Penguin', 250, 2);
        let b3 = new Book(3, "The Great Gatsby", 'F. Scott Fitzgerald', '1925', 'Penguin', 280, 7);
        let b4 = new Book(4, "One Hundred Years of Solitude", 'Gabriel Garcia Marquez', '1967', 'Penguin', 500, 4);
        let b5 = new Book(5, "Crime and Punishment", 'Fyodor Dostoevsky', '1866', 'Penguin', 700, 8);
        return [b1, b2, b3, b4, b5];
    }

    static initUsers() {
        let u1 = new User(1, "Markus Jacobs", '0361235478',[1,4], [2,5] );
        let u2 = new User(2, "Donald Smith", '0367800008',[5], []);
        let u3 = new User(3, "Alex Vovk", '03678911118',[],[]);
        let u4 = new User(4, "Mary Jonatan", '03222945478',[],[]);
        let u5 = new User(5, "Tim Margon", '03612367478',[5],[]);
        return [u1, u2, u3, u4, u5];
    }

    static initCards(){
        let c1 = new Card(1, 'Markus Jacobs',"Crime and Punishment","2020-02-11",'not fetched');
        let c2 = new Card(2, 'Markus Jacobs',"To Kill a Mockingbird","2020-02-11",'not fetched');
        let c3 = new Card(3, 'Markus Jacobs',"One Hundred Years of Solitude","2020-02-01",'2020-02-11');
        let c4 = new Card(4, 'Markus Jacobs',"Pride and Prejudice","2020-02-01",'2020-02-11');
        let c5 = new Card(5, 'Donald Smith',"Crime and Punishment","2019-10-09",'2020-01-09');
        let c6 = new Card(6, 'Tim Margon',"Crime and Punishment","2019-02-09",'2019-11-11');

        return [c1, c2, c3, c4, c5,c6];
    }

    static getAllBooks(){
        let data = DataSaver.getData();
        return data._books;
    }

    static getAllUsers(){
        let data = DataSaver.getData();
        return data._users;
    }

    static getAllCards(){
        let data = DataSaver.getData();
        return data._cards;
    }

    static getCardById(id){
        let data = Data.getAllCards();
        return data.find(x => x._id == id);
    }

    static getUserByCard(card){
        let users = this.getAllUsers();
        return users.find(x=>x._fullName===card._visitor)

    }




}