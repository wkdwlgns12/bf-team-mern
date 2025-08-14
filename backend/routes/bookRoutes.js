// routes/bookRoutes.js
const router = require("express").Router();
const Book = require("../models/Book");

// [CREATE] 도서 등록
router.post("/", async (req, res) => {
    try {
        const newBook = new Book(req.body);   // Post → Book
        const saved = await newBook.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ message: "작성실패", error });
    }
});

// [READ] 전체 도서
router.get("/", async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }); // Post → Book
        res.status(200).json(books); // GET은 200이 자연스럽습니다 (기존 201 → 200)
    } catch (error) {
        res.status(400).json({ message: "불러오기 실패", error });
    }
});

// [READ] 단일 도서
router.get("/:id", async (req, res) => {
    try {
        const book = await Book.findById(req.params.id); // Post → Book
        if (!book) return res.status(404).json({ message: "해당 글 없음" });
        res.status(200).json(book); // 201 → 200
    } catch (error) {
        res.status(400).json({ message: "1개 불러오기 실패", error });
    }
});

// [UPDATE] 도서 수정
router.put("/:id", async (req, res) => {
    try {
        const updated = await Book.findByIdAndUpdate( // Post → Book
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "수정할 글 없음" });
        res.status(200).json(updated); // 201 → 200
    } catch (error) {
        res.status(400).json({ message: "수정 실패", error });
    }
});

// [DELETE] 도서 삭제
router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Book.findByIdAndDelete(req.params.id); // Post → Book
        if (!deleted) return res.status(404).json({ message: "삭제할 글 없음" });
        res.status(200).json({ message: "삭제 게시글", post: deleted });
    } catch (error) {
        res.status(400).json({ message: "삭제 실패", error });
    }
});

module.exports = router;
