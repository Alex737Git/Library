import {DataSaver} from "../dataSaver.js";
import {Book} from "../models/book.js";
import {Library} from "../models/library.js";
import {Data} from "../data.js";
import {Print} from "../print.js";
import {Validator} from "../validator.js";
import {User} from "../models/user.js";

import {users} from "../globalVariables.js";
import {Helper} from "../helper.js";

$(document).ready(() => {

    $('.data').html(Print.printUserTable(Data.getAllUsers()));

    //region  User Modal dialog visitors

    let dialog, form;

    dialog = $("#dialog-form").dialog({
        autoOpen: false,
        height: 500,
        width: 450,
        modal: true,
        hide: {effect: "explode", duration: 2000},
        show: {effect: "blind", duration: 800},
        buttons: {
            "Add a new user": /*addUser*/ () => {
                let name = $('#name').val();
                let phone = $('#phone').val();

                if (!Validator.checkName(name)) {

                    name = '';

                    $('.validateTips').html('Name is not correct');
                    $('.validateTips').addClass("ui-state-highlight");

                    setTimeout(function () {
                        $('.validateTips').removeClass("ui-state-highlight", 5000);

                    }, 500);

                    setTimeout(function () {
                        $('.validateTips').html('All form fields are required.');

                    }, 5000);

                } else {

                    let usersArr = Data.getAllUsers();
                    usersArr.push(new User(Math.max(...users.map(o => o._id), 0) + 1, name, phone, [], []));
                    /*  library.addUser()*/

                    Print.addUserToTable(users[users.length - 1]);
                    DataSaver.saveData(new Library(Data.getAllBooks(), 'Slavic Bridge', usersArr, Data.getAllCards()));
                    dialog.dialog("close");

                }

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

    $('#newVisitor').click(function () {

        dialog.dialog("open");

    })
    //endregion

    /*region User Modal dialog Editing and Deleting*/

    let dialog1, form1;

    dialog1 = $("#dialog-form").dialog({
        autoOpen: false,
        height: 500,
        width: 450,
        modal: true,
        hide: {effect: "explode", duration: 1500},
        show: {effect: "blind", duration: 800},
        buttons: {
            "Save the user": /*addUser*/ () => {
                let user = $("#dialog-form").data('user');

                let users = Data.getAllUsers();
                let index = -1;
                for (let i = 0; i < users.length; i++) {
                    if (user._id === users[i]._id) {
                        index = i;
                        break;
                    }
                }

                let userOldName = user._fullName;

                //2 сохранить данные
                user._fullName = $('#name').val();
                user._phone = $('#phone').val();
                users[index] = user;

                // 3 Изменить список карточек
                let userNewName = user._fullName;
                let cards = Data.getAllCards();
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i]._visitor === userOldName) {
                        cards[i]._visitor = userNewName;
                    }
                }

                //4 сохранить список

                DataSaver.saveData(new Library(Data.getAllBooks(), 'Slavic bridge', users, cards));

                //5 распичатать список с новыми данными
                $('.data').html(Print.printUserTable(Data.getAllUsers()));
                dialog1.dialog("close");

            },
            'Delete the user': function () {
                let user = $("#dialog-form").data('user');
                let users = Data.getAllUsers();
                let cards = Data.getAllCards();
                //1 нужно найти пользователя
//2 нужно проверить книги, если он должен
                if (user._borrowedBooks.length > 0) {
                    $('.validateTips').html(`${user._fullName} still has not returned books. You can't delete him`);
                    $('.validateTips').addClass("ui-state-highlight");

                    setTimeout(function () {
                        $('.validateTips').removeClass("ui-state-highlight", 5000);
                        $('.validateTips').html();
                    }, 500);
                } else {
                    //3 если ничего не должен можно удалить пользователя c пользователей и с карточек

                    for (let i = 0; i < users.length; i++) {
                        if (user._id === users[i]._id) {
                            users.splice(i, 1);
                            break;
                        }
                    }

                    for (let i = 0; i < cards.length; i++) {
                        if (user._fullName === cards[i]._visitor) {
                            cards.splice(i, 1);
                            i--;
                        }
                    }
//4 сохранить инфо и перепичатать экран
                    DataSaver.saveData(new Library(Data.getAllBooks(), 'Slavic bridge', users, cards))
                    $('.data').html(Print.printUserTable(Data.getAllUsers()));
                    dialog1.dialog("close");

                }



            },
            Cancel: function () {
                dialog1.dialog("close");
            }
        },
        close: function () {

        }
    });

    form1 = dialog1.find("form").on("submit", function (event) {
        event.preventDefault();
        /*function Add users*/
    });

    $('.data').on('click', 'button', function (event) {
        event.preventDefault();
        let id = $(this).parent().prevAll("th").text();

        //1 найти пользователя
        let users = Data.getAllUsers();
        let user = users.find(x => x._id === +id);

        //2 вывести данные в форму
        $('#name').val(user._fullName);
        $('#phone').val(user._phone);

        dialog1.data('user', user).dialog("open");

    });
    /*endregion*/

    /*region Sort*/
    $('#sort').change(() => {

        let b = $("#sort").val();
        if (b === 'name') {
            let arr = Data.getAllUsers().sort((x, y) => x._fullName.localeCompare(y._fullName));
            Print.printUserTable(arr);
            $('.data').html(Print.printUserTable(arr));
        } else {
            $('.data').html(Print.printUserTable(Data.getAllUsers()));
        }

    });
    /*endregion*/

    /*region Autocomplete*/
    $("#search").autocomplete({
        source: [...Helper.getFullNameArrayOfUsers(Data.getAllUsers())],
        change: function (event, ui) {
            if (Helper.isNumeric(ui.item.value)) {
                $('.data').html(Print.printUserTable(Helper.getUserByName(undefined, ui.item.value)))
            } else {

                $('.data').html(Print.printUserTable(Helper.getUserByName(ui.item.value)))
            }

        }
    });

    $('#returnList').click(() => {
        $('.data').html(Print.printUserTable(Data.getAllUsers()));
    });

    /*endregion*/

});