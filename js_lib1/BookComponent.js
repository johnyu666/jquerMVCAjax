class BookComponent{
    constructor(el,url,books){
        this.el=el;
        this.url=url;
        this.books=books;
    }
    render(){
        let tbody=this.el.find("#bookList table tbody");
        tbody.empty();
        this.books.forEach((book,index)=>{
            $("<tr>")
                .data("book",book)
                .append($("<td>").text(book.id))
                .append($("<td>").text(book.bname))
                .append($("<td>").text(book.price))
                .append($("<td>").append($("<button>").text("del")))
                .appendTo(tbody);
        });

        this.el.find("#addBook form").off("submit");
        this.el.find("#updateBook form").off("submit");
        this.el.find("#updateBook button").off("click");
        this.el.find("#bookList button[name=del]").off("click");
        this.el.find("#bookList tbody tr").off("dblclick");

        this.el.find("#addBook form").on("submit",(event)=>{this.addBook(event)});
        this.el.find("#updateBook form").on("submit",(event)=>{this.updateBook(event)});
        this.el.find("#updateBook button").on("click",()=>{this.cancel()});

        this.el.find("#bookList tbody tr").on("dblclick",(event)=>{
            this.fillToUpdateBookDiv(event);
        });
        //删除按钮
        this.el.find("#bookList tbody tr button").on("click",(event)=>{
            this.deleteBook(event)
        });

    }
    addBook(event){
        let bname=this.el.find("#addBook [name=bname]").val();
        let price=this.el.find("#addBook [name=price]").val();
        let book={id:++this.books.maxId,bname:bname,price:price};
        this.books.push(book);
        this.render();
        event.preventDefault();
    }
    deleteBook(event){
        let book=$(event.target).data("book");
        let index=this.books.indexOf(book);
        this.books.splice(index,1);
        this.render();
    }
    fillToUpdateBookDiv(event){
        let el=this.el.find("#updateBook");
        let book=$(event.target).parents("tr").data("book");
        el.data("book",book);
        el.find("[name=bname]").val(book.bname);
        el.find("[name=price]").val(book.price);
        el.css({display:"block"});

    }
    updateBook(event){
        let el=this.el.find("#updateBook");
        let book=el.data("book");
        book.bname=el.find("[name=bname]").val();
        book.price=el.find("[name=price]").val();
        el.css({display:"none"});
        this.render();
        event.preventDefault();
    }
    cancel(){
        this.el.find("#updateBook").css({display:"none"});
    }


}
