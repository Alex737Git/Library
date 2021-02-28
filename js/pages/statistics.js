import {Data} from "../data.js";


$(document).ready(() => {

    let user = Data.getAllUsers().filter(x => x._readBooks.length > 0||x._borrowedBooks.length>0);

    let stat = new Map();

    for (let u of user){
        stat.set(u._fullName,u._borrowedBooks.length+u._readBooks.length)
    }
    let userMap = new Map([...stat.entries()].sort((a, b) => b[1] - a[1]));

    let readbooks=[];
    let userName=[];

    for (let [key, value] of userMap){
        userName.push(key);
        readbooks.push(value);
    }


        /*region The best readers chart*/
    let chart = new CanvasJS.Chart("chartContainer",
        {
            axisY: {
                title: "The best readers",
                titleFontFamily: "tahoma"
            },

            data: [
                {
                    type: "column",
                    dataPoints: [

                        {label: `${userName[0]}`, y: readbooks[0]},
                        {label: `${userName[1]}`, y: readbooks[1]},
                        {label: `${userName[2]}`, y: readbooks[2]},

                    ]
                }
            ]
        });

    chart.render();

    /*endregion*/



    /*region function to get the best books*/
let users = Data.getAllUsers();
    let bestBooks = []
    for (let user of users) {
        if (user._readBooks.length > 0) {
            for (let book of user._readBooks) {
                bestBooks.push(book);
            }
        }
        if (user._borrowedBooks.length > 0) {
            for (let book of user._borrowedBooks) {
                bestBooks.push(book);
            }
        }
    }


    let hist = {};
    bestBooks.map( function (a)
        { if (a in hist) hist[a] ++;
        else hist[a] = 1; }
    );


    let bookMap = new Map();
    for (const [key,value] of Object.entries(hist)){

        bookMap.set(key,value);

    }

     bookMap = new Map([...bookMap.entries()].sort((a, b) => b[1] - a[1]));

    let books=Data.getAllBooks();
let bookName=[]
   for (let i of bookMap.keys()){
       for (let j of books){
           if(i==j._id){
               bookName.push(j._name)
               break;
           }
       }
   }

   let number=[];
   for (let j of bookMap.values()){
       number.push(j);
   }

    /*endregion*/


/*region The best books*/
    let chart1 = new CanvasJS.Chart("chartContainer1",
        {
            axisY: {
                title: "The best books",
                titleFontFamily: "tahoma"
            },

            data: [
                {
                    type: "doughnut",
                    dataPoints: [

                        {label: `${bookName[0]}`, y: number[0]},
                        {label: `${bookName[1]}`, y: number[1]},
                        {label: `${bookName[2]}`, y: number[2]},
                        {label: `${bookName[3]}`, y: number[3]},

                    ]
                }
            ]
        });

    chart1.render();
/*endregion*/

});