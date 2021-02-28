

export class Print {

    static printUserTable(visitors) {
        let table = `<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Phone</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
<tbody>`;

        for (let visitor of visitors) {

            table += ` <tr>
      <th scope="row">${visitor._id}</th>
      <td>${visitor._fullName}</td>
      <td>${visitor._phone}</td>
      <td><button>Edit</button></td>
    </tr>`
        }
        table += ` </tbody>
                   </table>`

        return table;
    }

    static addUserToTable(user) {
        $(".table tbody").append(`<tr>
            <th scope="row">${user._id}</th>
            <td>${user._fullName}</td>
            <td>${user._phone}</td>
            <td><button>Edit</button></td>
        </tr>`);
    }

    static printBooksTable(books) {
        let table = `<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Author</th>
      <th scope="col">Year</th>
      <th scope="col">Publisher</th>
      <th scope="col">Pages</th>
      <th scope="col">Count</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
<tbody>`;

        for (let book of books) {

            table += ` <tr>
      <th scope="row">${book._id}</th>
      <td>${book._name}</td>
      <td>${book._author}</td>
      <td>${book._year}</td>
      <td>${book._publisher}</td>
      <td>${book._pages}</td>
      <td>${book._count}</td>
      <td><button>Edit</button></td>
    </tr>`
        }
        table += ` </tbody>
                   </table>`

        return table;
    }

    static addBookToTable(book) {
        $(".table tbody").append(`<tr>
            <th scope="row">${book._id}</th>
            <td>${book._name}</td>
            <td>${book._author}</td>
            <td>${book._year}</td>
            <td>${book._publisher}</td>
            <td>${book._pages}</td>
            <td>${book._count}</td>
          
            <td><button>Edit</button></td>
        </tr>`);
    }

    static loadBooksListToCards(books) {
        let out = '';

        for (let book of books.filter(x=>x._count>0)) {

            out += `
            <option value="${book._id}">${book._name}</option>
            `;

        }

        $('#books-list').html(out);
    }
    static loadUsersListToCards(users) {
        let out = '';

        for (let user of users) {

            out += `
            <option value="${user._id}">${user._fullName}</option>
            `;

        }

        $('#user-list').html(out);
    }

    static printCardsTable(cards){
        let table = `<table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Visitor</th>
      <th scope="col">Book</th>
      <th scope="col">Borrow Date</th>
      <th scope="col">Return Date</th>
    </tr>
  </thead>
<tbody>`;

        for (let card of cards) {

            table += ` <tr>
      <th scope="row">${card._id}</th>
      <td>${card._visitor}</td>
      <td>${card._bookName}</td>
      <td>${card._borrowDate}</td>
      <td>${card._returnDate==='not fetched'?'' +
                '<button class="return"></button>':card._returnDate}
      </td>
     
    </tr>`
        }
        table += ` </tbody>
                   </table>`

        return table;
    }


    static addCardToTable(card){
        $(".table tbody").append(`<tr>
            <th scope="row">${card._id}</th>
           
            <td>${card._visitor}</td>
            <td>${card._bookName}</td>
            <td>${card._borrowDate}</td>
           <td>${card._returnDate==='<button class="return"></button>'}</td>
           
          
           
        </tr>`);
    }
}