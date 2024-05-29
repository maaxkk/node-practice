const Genre = require("../models/genre");
const Book = require("../models/book");
const asyncHandler = require("express-async-handler");
const {Mongoose} = require("mongoose");
const {body, validationResult} = require('express-validator');

// Display list of all Genre.
exports.genre_list = asyncHandler(async (req, res, next) => {
    const allGenres = await Genre.find().sort({name: 1}).exec();
    res.render('genres_list', {title: 'Genres list', genres_list: allGenres})
});

// Display detail page for a specific Genre.
exports.genre_detail = asyncHandler(async (req, res, next) => {
    // Get details of genre and all associated books (in parallel)
    const genreIdValidatetion = Mongoose.prototype.isValidObjectId(req.params.id)
    if (!genreIdValidatetion) {
        const err = new Error('Please enter valid id of genre')
        return next(err);
    }
    const [genre, booksInGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({genre: req.params.id}, 'title summary').exec(),
    ]);
    if (genre === null) {
        // No results
        const err = new Error('Genre not found')
        err.status(404);
        return next(err);
    }
    res.render('genre_detail', {
        title: "Genre Detail",
        genre: genre,
        genre_books: booksInGenre,
    });
});

// Display Genre create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render('genre_form', {title: 'Create Genre'})
};

// Handle Genre create on POST.
exports.genre_create_post = [
    // validate and sanitize the name field
    body("name", "Genre name must contain at least 3 characters")
        .trim()
        .isLength({min: 3})
        .escape(),
    // Process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // extract the validation errors from a request.
        const errors = validationResult(req);
        // Create a genre object with escaped and trimmed data.
        const genre = new Genre({name: req.body.name})

        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('genre_form', {
                title: 'Create genre',
                genre: genre,
                errors: errors.array(),
            });
            console.log(errors.array())
            return;
        } else {
            // Data form is valid
            // Check if Genre with the same name already exists
            const genreExists = await Genre.findOne({name: req.body.name})
                .collation({locale: 'en', strength: 2})
                .exec();
            if (genreExists) {
                res.redirect(genreExists.url);
            } else {
                await genre.save();
                res.redirect(genre.url);
            }

        }
    })
]


// Display Genre delete form on GET.
exports.genre_delete_get = asyncHandler(async (req, res, next) => {
    // Get details of genre and all books with this genre ( in parallel)
    const [genre, booksWithGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({genre: req.params.id}, 'title summary').exec(),
    ])
    if (genre === null) {
        // No results
        res.redirect('/catalog/genres');
    }
    res.render('genre_delete', {
        title: 'Delete genre',
        genre: genre,
        genre_books: booksWithGenre,
    })
});

// Handle Genre delete on POST.
exports.genre_delete_post = asyncHandler(async (req, res, next) => {
    // get details of genre and all his books (in parallel)
    const [genre, booksWithGenre] = await Promise.all([
        Genre.findById(req.params.id).exec(),
        Book.find({genre: req.params.id}, 'title summary').exec()
    ]);
    if (booksWithGenre.length > 0) {
        // Still exists books with this genre
        // Render just GET route
        res.render('genre_delete', {
            title: 'Delete genre',
            genre: genre,
            genre_books: booksWithGenre,
        })
        return
    } else {
        await Genre.findByIdAndDelete(req.body.genreid)
        res.redirect('/catalog/genres')
    }
});

// Display Genre update form on GET.
exports.genre_update_get = asyncHandler(async (req, res, next) => {
    const genre = await Genre.findById(req.params.id).exec()
    if (genre === null) {
        const err = new Error('Genre not found')
        err.status = 404;
        return next(err);
    }
    res.render('genre_form', {
        title: 'Update genre',
        genre: genre,
    })
});

// Handle Genre update on POST.
exports.genre_update_post = [
    // validate fields
    body('name')
        .trim()
        .isLength({min: 3})
        .escape(),

    // Process request after validation
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const newGenre = new Genre({
            name: req.body.name,
            _id: req.params.id, // required, or a new id will be assigned
        });
        if (!errors.isEmpty()){
            res.render('genre_form', {
                title: 'Update genre',
                genre: newGenre,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedGenre = await Genre.findByIdAndUpdate(req.params.id, newGenre, {});
            res.redirect(updatedGenre.url);
        }
    })
]
