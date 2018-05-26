class BookRender {
    constructor(bookManager, table) {
        this.bookManager = bookManager;
        this.table = table;
        // bookManager.findAllBooks();
        //this.books=bookManager.books;
        bookManager.findAllBooks(this);

    }

    createTable(books) {
        if (books) {
            this.books = books;
        }
        this.books.forEach((book) => {
            $('<tr>')
                .data("book", book)
                .append($("<td>").text(book.id))
                .append($("<td>").text(book.bname))
                .append($("<td>").text(book.price))
                .append($("<td>")
                    .append($("<button>").text("删除")).on("click", (event) => {
                        this.deleteRow(event)
                    }))
                .appendTo(this.table.children("tbody"));
        });
        this.bindBookToUpdatePan();

    }

    deleteRow(event) {
        var book = $(event.target).parents("tr").data("book");
        this.bookManager.deleteBook(book,this);
    }
    deleteRowCallback() {
        this.dropTable();
        this.createTable();
    }

    dropTable() {
        this.table.children("tbody").empty();
    }

    bindBookToUpdatePan() {
        this.table.find("tr").dblclick(function () {

            let book = $(this).data("book");
            $("#updateBook [name=bname]").val(book.bname);
            $("#updateBook [name=price]").val(book.price);
            $("#updateBook").data("book", book);
            $("#updateBook").css({"display":"block"});
        });
        $("#updateBook form").off("submit");
        $("#updateBook form").on("submit", (event) => {
            this.updateTable(event);
        });

    }

    updateTable(event) {
        let book = $("#updateBook").data("book");
        book.bname = $("#updateBook [name=bname]").val();
        book.price = $("#updateBook [name=price]").val();
        this.bookManager.updateBook(book,this);
        event.preventDefault();

    }
    updateTableCallback() {
        this.dropTable();
        this.createTable();
        $("#updateBook").css({"display":"none"});

    }
    addRow(){
        var book={bname: $("#bookAdd [name=bname]").val(),price:$("#bookAdd [name=price]").val()};
        this.bookManager.addBook(book,this);
    }
    addRowCallback(){
        this.dropTable();
        this.createTable();
    }
}