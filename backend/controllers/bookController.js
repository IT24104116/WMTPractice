import Book from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch book" });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, imageUrl, description, genre } = req.body;

    const newBook = await Book.create({
      title,
      author,
      imageUrl,
      description,
      genre,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create book",
      error: error.message,
    });
  }
};

export const deleteBook = async (req, res) =>{
  try{
    const deleteBook = await Book.findByIdAndDelete(req.params.id);
    if (!deleteBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({message: "Book deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: "Failed to delete book" });
  }
}

export const updateBook = async (req, res) => {
  try {
    const { title, author, imageUrl, description, genre } = req.body;

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, imageUrl, description, genre },
      {
      new: true,
      runValidators: true,
      }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update book",
      error: error.message,
    });
  }
};

// TODO: Implement deleteBook
