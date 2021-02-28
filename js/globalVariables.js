import {DataSaver} from "./dataSaver.js";

import {Library} from "./models/library.js";
import {Data} from "./data.js";





/*export let library = new Library( Data.initBooks(), "Slavic bridge", Data.initUsers(),Data.initCards());
DataSaver.saveData(library);*/



export let data = DataSaver.getData();
export let users = data._users;
/*export let library = new Library(data._books, data._name, data._users,data._cards);*/





/*data._books.length=5
data._users.length=5;
DataSaver.saveData(library);*/