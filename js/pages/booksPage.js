import {DataSaver} from "../dataSaver.js";
import {Book} from "../models/book.js";
import {Library} from "../models/library.js";
import {Data} from "../data.js";
import {Print} from "../print.js";
import {Validator} from "../validator.js";
import {User} from "../models/user.js";
import {data} from "../globalVariables.js";
import {Helper} from "../helper.js";

$(document).ready(() => {

    $('.books').html(Print.printBooksTable(data._books));

    //region Book add Modal dialog

    let bookDialog, bookForm;

    bookDialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 500,
        width: 450,
        modal: true,
        hide: {effect: "explode", duration: 2000},
        buttons: {
            "Add a new book": () => {
                let name = $('#name').val();
                let author = $('#author').val();
                let year = $('#year').val();
                let publisher = $('#publisher').val();
                let pages = $('#pages').val();
                let count = $('#count').val();

                if (!Validator.checkName(name) || !Validator.checkName(author)) {

                    name = '';
                    author = '';

                    $('.validateTips').html('Name or Author is not correct');
                    $('.validateTips').addClass("ui-state-highlight");

                    setTimeout(function () {
                        $('.validateTips').removeClass("ui-state-highlight", 5000);

                    }, 500);

                    setTimeout(function () {
                        $('.validateTips').html('All form fields are required.');

                    }, 5000);

                } else {

                    let book = new Book(Math.max(...data._books.map(o => o._id), 0) + 1, name, author, year, publisher, pages, count);

                    let books = Data.getAllBooks();
                    books.push(book);
                    /*  library.addBook(book);*/

                    Print.addBookToTable(book);

                    /*DataSaver.saveData(library);*/
                    DataSaver.saveData(new Library(books, 'Slavic bridge', Data.getAllUsers(), Data.getAllCards()));

                    bookDialog.dialog("close");

                }

            },
            Cancel: function () {
                bookDialog.dialog("close");
            }
        },
        close: function () {

        }
    });

    bookForm = bookDialog.find("form").on("submit", function (event) {
        event.preventDefault();
        /*function Add users*/
    });

    $('#newBook').click(function () {

        bookDialog.dialog("open");

    })
    //endregion

    /*region Edit book Modal dialog*/

    let bookDialog1, bookForm1;

    bookDialog1 = $("#dialog-form").dialog({
        autoOpen: false,
        height: 500,
        width: 450,
        modal: true,
        hide: {effect: "explode", duration: 1500},
        buttons: {
            "Edit the book": () => {
                let book = $("#dialog-form").data('book');

                let name = $('#name').val();
                let author = $('#author').val();
                let year = $('#year').val();
                let publisher = $('#publisher').val();
                let pages = $('#pages').val();
                let count = $('#count').val();

                if (!Validator.checkName(name) || !Validator.checkName(author)) {

                    name = '';
                    author = '';

                    $('.validateTips').html('Name or Author is not correct');
                    $('.validateTips').addClass("ui-state-highlight");

                    setTimeout(function () {
                        $('.validateTips').removeClass("ui-state-highlight", 5000);

                    }, 500);

                    setTimeout(function () {
                        $('.validateTips').html('All form fields are required.');

                    }, 5000);

                } else {

                    let newBook = new Book(book._id, name, author, year, publisher, pages, count);

                    let books = Data.getAllBooks();
                    let index = books.findIndex(x=>x._id===book._id);
                    books[index]=newBook;

                    let cards = Data.getAllCards();
                    for (let i =0; i<cards.length; i++){
                        if(cards[i]._bookName===book._name){
                            cards[i]._bookName=newBook._name
                        }
                    }
                    //закончил здесь



                    DataSaver.saveData(new Library(books, 'Slavic bridge', Data.getAllUsers(), cards));
                    $('.books').html(Print.printBooksTable(books));
                    bookDialog1.dialog("close");

                }

            },
            'Delete the book':function (){
                let book = $("#dialog-form").data('book');
                let isBorrowed = false;
                let users = Data.getAllUsers();
                for (let i =0; i<users.length; i++){
                   for (let j of users[i]._borrowedBooks){
                       if(j==book._id){
                           isBorrowed=true;
                           break;
                       }
                   }
                }

                if(isBorrowed){
                    $('.validateTips').html('This book can not be delete because it is still on hands');
                    $('.validateTips').addClass("ui-state-highlight");

                    setTimeout(function () {
                        $('.validateTips').removeClass("ui-state-highlight", 5000);

                    }, 500);

                    setTimeout(function () {
                        $('.validateTips').html('All form fields are required.');

                    }, 5000);

                }else{

                    let books = Data.getAllBooks();
                    let index = books.findIndex(x=>x._id===book._id);
                    books.splice(index,1);

                    let cards = Data.getAllCards();
                    for (let i=0; i<cards.length; i++){
                        if(cards[i]._bookName===book._name){
                            cards.splice(i,1);
                            i--;
                        }
                    }
// delete the books from users that has it as read books

                    for (let user of users){
                       for (let i=0; i<user._readBooks.length; i++){
                           if(user._readBooks[i]===book._id){
                               user._readBooks.splice(i,1);
                           }
                       }
                    }



                    DataSaver.saveData(new Library(books,'Slavic Bridge',users,cards));
                    $('.books').html(Print.printBooksTable(books));

                    bookDialog1.dialog("close");
                }





            },
            Cancel: function () {
                bookDialog1.dialog("close");
            }
        },
        close: function () {

        }
    });

    bookForm1 = bookDialog1.find("form").on("submit", function (event) {
        event.preventDefault();

    });

    $('.books').on('click', 'button', function (event) {
        event.preventDefault();

        let id = $(this).parent().prevAll("th").text();

        //1 найти книгу
        let book = Data.getAllBooks().find(x => x._id === +id);

        $('#name').val(book._name);
        $('#author').val(book._author);
        $('#year').val(book._year);
        $('#publisher').val(book._publisher);
        $('#pages').val(book._pages);
        $('#count').val(book._count);

        bookDialog1.data('book', book).dialog("open");
    })
    /*endregion*/

    /*region Sort*/
    $('#sort').change(() => {

        let b = $("#sort").val();
        if (b === 'name') {
            let arr = Data.getAllBooks().sort((x, y) => x._name.localeCompare(y._name));
            Print.printBooksTable(arr);
            $('.books').html(Print.printBooksTable(arr));
        } else if (b === 'author') {
            let arr = Data.getAllBooks().sort((x, y) => x._author.localeCompare(y._author));
            $('.books').html(Print.printBooksTable(arr));
        } else if (b === 'count') {
            let arr = Data.getAllBooks().sort((x, y) => x._count - y._count);
            $('.books').html(Print.printBooksTable(arr));
        } else {
            $('.books').html(Print.printBooksTable(data._books));
        }

    });
    /*endregion*/

    /*region Autocomplete*/
    $("#search").autocomplete({
        source: [...Helper.getBookNameAuthorPublisherArray()],
        change: function (event, ui) {

            $('.books').html(Print.printBooksTable(Helper.findType(ui.item.value)));

        }
    });
    $('#returnList').click(() => {
        $('.books').html(Print.printBooksTable(Data.getAllBooks()));
    });

    /*endregion*/
});