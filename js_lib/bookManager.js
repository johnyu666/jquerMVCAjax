class BookManager {
    constructor(url) {
        this.url = url;
    }

    findAllBooks(render) {
        this.maxId=0;
        this.books = [
            {id: ++this.maxId, bname: "book1", price: 23.45},
            {id: ++this.maxId, bname: "book2", price: 23.45},
            {id: ++this.maxId, bname: "book3", price: 23.45},
            {id: ++this.maxId, bname: "book4", price: 23.45}
        ]
        setTimeout(() => {
            render.createTable(this.books);

        }, 500);


    }
    addBook(book,render){
        book.id=++this.maxId;
        this.books.push(book);
        setTimeout(()=>{
            render.addRowCallback();
        },500);
    }
    deleteBook(book,render) {
        let index = this.books.indexOf(book);
        this.books.splice(index, 1);
        setTimeout(()=>{
            render.deleteRowCallback();
        },500);
    }

    updateBook(book,render,event) {
        var bk={id:book.id,bname:book.bname,price:book.price};
        book.bname=bk.bname;
        book.price=bk.price;
        setTimeout(()=>{
            render.updateTableCallback();
        },500);


    }


}
window.BookManager=BookManager;

