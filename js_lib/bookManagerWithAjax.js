class BookManager {
    constructor(url) {
        this.url = url;
    }

    findAllBooks(render) {
        var option={url:this.url,type:"GET"};
        $.ajax(option).done((books)=>{
            this.books=books;
            render.createTable(this.books);
        });
    }
    addBook(book,render){
        var option={url:this.url,type:"POST",contentType:"application/json"};
        option.data=JSON.stringify(book);
        $.ajax(option)
            .done((bk)=>{
                this.books.push(bk);
                render.addRowCallback();
            });
    }
    deleteBook(book,render) {
        var option={url:this.url+"/"+book.id,type:"DELETE"};
        $.ajax(option)
            .done((b)=>{
                let index=this.books.indexOf(book);
                this.books.splice(index, 1);
                render.deleteRowCallback();
            });
    }

    updateBook(book,render,event) {
        var option={url:this.url+"/"+book.id,type:"PUT",contentType:"application/json"};
        option.data=JSON.stringify(book);
        $.ajax(option)
            .done((bk)=>{
                book.bname=bk.bname;
                book.price=bk.price;
                render.updateTableCallback();
            });


    }


}
window.BookManager=BookManager;

