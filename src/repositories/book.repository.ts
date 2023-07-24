import { Op } from "sequelize";
import Book from "../models/book.model";

interface IBookRepository {
    save(book: Book): Promise<Book>;
    retrieveAll(searchParams: { title?: string; price?: number }): Promise<Book[]>;
    retrieveById(bookId: number): Promise<Book | null>;
    update(book: Book): Promise<number>;
    delete(bookId: number): Promise<number>;
    deleteAll(): Promise<number>;
}

interface SearchCondition {
    [key: string]: any;
}

class BookRepository implements IBookRepository {
    async save(book: Book): Promise<Book> {
        try {
            return await Book.create({
                title: book.title,
                description: book.description,
                price: book.price,
                // Add other properties of the "book" model as needed
            });
        } catch (err) {
            throw new Error("Failed to create Book!");
        }
    }

    async retrieveAll(searchParams: {
        title?: string;
        price?: number;
    }): Promise<Book[]> {
        try {
            let condition: SearchCondition = {};

            if (searchParams?.title)
                condition.title = { [Op.like]: `%${searchParams.title}%` };

            if (searchParams?.price) condition.price = searchParams.price;

            return await Book.findAll({ where: condition });
        } catch (error) {
            throw new Error("Failed to retrieve Books!");
        }
    }

    async retrieveById(bookId: number): Promise<Book | null> {
        try {
            return await Book.findByPk(bookId);
        } catch (error) {
            throw new Error("Failed to retrieve Books!");
        }
    }

    async update(book: Book): Promise<number> {
        const { id, title, description, price } = book;

        try {
            const affectedRows = await Book.update(
                { title, description, price },
                { where: { id: id } }
            );

            return affectedRows[0];
        } catch (error) {
            throw new Error("Failed to update Book!");
        }
    }

    async delete(bookId: number): Promise<number> {
        try {
            const affectedRows = await Book.destroy({ where: { id: bookId } });

            return affectedRows;
        } catch (error) {
            throw new Error("Failed to delete Book!");
        }
    }

    async deleteAll(): Promise<number> {
        try {
            return Book.destroy({
                where: {},
                truncate: false,
            });
        } catch (error) {
            throw new Error("Failed to delete Books!");
        }
    }
}

export default new BookRepository();
