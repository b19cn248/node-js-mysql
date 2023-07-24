import { Request, Response } from "express";
import Book from "../models/book.model";
import bookRepository from "../repositories/book.repository";

export default class BookController {
    async create(req: Request, res: Response) {
        if (!req.body.title) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
            return;
        }

        try {
            const book: Book = req.body;

            const savedBook = await bookRepository.save(book);

            res.status(201).send(savedBook);
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while saving the book."
            });
        }
    }

    async findAll(req: Request, res: Response) {
        const title = typeof req.query.title === "string" ? req.query.title : "";

        try {
            const books = await bookRepository.retrieveAll({ title });

            res.status(200).send(books);
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while retrieving books."
            });
        }
    }

    async findOne(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const book = await bookRepository.retrieveById(id);

            if (book) res.status(200).send(book);
            else
                res.status(404).send({
                    message: `Cannot find Book with id=${id}.`
                });
        } catch (err) {
            res.status(500).send({
                message: `Error retrieving Book with id=${id}.`
            });
        }
    }

    async update(req: Request, res: Response) {
        let book: Book = req.body;
        book.id = parseInt(req.params.id);

        try {
            const num = await bookRepository.update(book);

            if (num == 1) {
                res.send({
                    message: "Book was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Book with id=${book.id}. Maybe Book was not found or req.body is empty!`
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Error updating Book with id=${book.id}.`
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id: number = parseInt(req.params.id);

        try {
            const num = await bookRepository.delete(id);

            if (num == 1) {
                res.send({
                    message: "Book was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
                });
            }
        } catch (err) {
            res.status(500).send({
                message: `Could not delete Book with id=${id}.`
            });
        }
    }

    async deleteAll(req: Request, res: Response) {
        try {
            const num = await bookRepository.deleteAll();

            res.send({ message: `${num} Books were deleted successfully!` });
        } catch (err) {
            res.status(500).send({
                message: "Some error occurred while removing all books."
            });
        }
    }
}
