import {Print} from "../print.js";
import {Validator} from "../validator.js";
import {User} from "../models/user.js";

import {Card} from "../models/card.js";
import {DataSaver} from "../dataSaver.js";
import {Library} from "../models/library.js";
import {Data} from "../data.js";
import {Helper} from "../helper.js";

$(document).ready(() => {

    let b = Data.getAllCards();
    if (b) {
        $('.cards').html(Print.printCardsTable(b));

    }

    Print.loadBooksListToCards(Data.getAllBooks());
    Print.loadUsersListToCards(Data.getAllUsers());

    //region  User Modal dialog cards

    let dialog, form;

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 300,
        width: 450,
        modal: true,
        hide: { effect: "explode", duration: 2000 },
        buttons: {
            "Add a new card": () => {
                let userId = $('#user-list :selected').val();
                let bookId = $('#books-list :selected').val();

                let user = $('#user-list :selected').text();
                let book = $('#books-list :selected').text();

                //todo add count
                let books = Data.getAllBooks();
                let users = Data.getAllUsers();

                let bookIndex = books.findIndex(b => b._id == bookId);
                books[bookIndex]._count--;

                let userIndex = users.findIndex(x => x._id == userId);
                users[userIndex]._borrowedBooks.push(bookId);

//region Find Id for a card
                let id = 0;
                if (Data.getAllCards().length === 0) {
                    id = 1;
                } else {
                    let lib = Data.getAllCards();
                    id = Math.max(...lib.map(o => o._id), 0) + 1
                }

//endregion

                let card = new Card(id, user, book, Helper.getDateFormat(), 'not fetched');
                b.push(card);

                DataSaver.saveData(new Library(books, "Slavic bridge", users, b));

                /* let data = DataSaver.getData();*/
                /*library=new Library(data._books, data._name, data._users,data._cards);*/

                Print.loadBooksListToCards(Data.getAllBooks());

                $('.cards').html(Print.printCardsTable(Data.getAllCards()));

                dialog.dialog("close");

            },
            Cancel: function () {
                dialog.dialog("close");
            }
        },
        close: function () {

        }
    });

    form = dialog.find("form").on("submit", function (event) {
        event.preventDefault();
        /*function Add users*/
    });

    $('#newCard').click(function () {

        dialog.dialog("open");

    })
    //endregion

    /*region Sort*/
    $('#sort').change(() => {

        let b = $("#sort").val();
        if (b === 'book') {
            let arr = Data.getAllCards().sort((x, y) => x._bookName.localeCompare(y._bookName));

            $('.cards').html(Print.printCardsTable(arr));

        } else if (b === 'borrowDate') {

            let arr = Data.getAllCards().sort(function (a, b) {

                return new Date(b._borrowDate) - new Date(a._borrowDate)
            });

            $('.cards').html(Print.printCardsTable(arr));
        } else {
            $('.cards').html(Print.printCardsTable(Data.getAllCards()));
        }

    });
    /*endregion*/

    /*region Autocomplete*/
    $("#search").autocomplete({
        source: [...Helper.getVisitorBookBorrowdateArray()],
        change: function (event, ui) {

            $('.cards').html(Print.printCardsTable(Helper.findTypeCards(ui.item.value)));
        }
    });

    $('#returnList').click(() => {
        $('.cards').html(Print.printCardsTable(b));
    });

    /*endregion*/

    //https://stackoverflow.com/questions/66382951/how-to-find-value-of-card-id-using-jquery
    // при нажатии кнопки выводить день здачи

    $( ".cards" ).on( "click", "button", function( event ) {
        event.preventDefault();
        let id = $(this).parent().prevAll("th").text();

        //3 Перекинуть книгу с читаных в прочитанные
        User.traverseBook(id);
// 4 Обновить данные
        b = Data.getAllCards();

        //6 Переписать список
        $('.cards').html(Print.printCardsTable(Data.getAllCards()));


    });
});