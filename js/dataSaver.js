export class DataSaver {

    static getData() {

        let json_str = JSON.parse(localStorage.getItem('data_lib'));
        if (json_str !== undefined) {
            return json_str;

        } else {
            alert('there is not data');
        }
    }

    static saveData(library) {
        let data_lib = JSON.stringify(library);
        localStorage.setItem('data_lib', data_lib);
    }

   /* static saveBooks(books) {
        let data_books = JSON.stringify(books);
        localStorage.setItem('data_books', data_books);
    }

    static saveUsers(users) {
        let data_users = JSON.stringify(users);
        localStorage.setItem('data_users', data_users);
    }

    static saveCards(cards) {
        let data_cards = JSON.stringify(cards);
        localStorage.setItem('data_cards', data_cards);
    }

    static getBooks(){
        let json_str = JSON.parse(localStorage.getItem('data_books'));
        if (json_str !== undefined) {
            return json_str;

        } else {
            alert('there is not data');
        }
    }

    static getUsers(){
        let json_str = JSON.parse(localStorage.getItem('data_users'));
        if (json_str !== undefined) {
            return json_str;

        } else {
            alert('there is not data');
        }
    }

    static getCards(){
        let json_str = JSON.parse(localStorage.getItem('data_cards'));
        if (json_str !== undefined) {
            return json_str;

        } else {
            alert('there is not data');
        }
    }*/
}