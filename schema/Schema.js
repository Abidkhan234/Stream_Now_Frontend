import * as Yup from 'yup'

const loginSchema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format"),
    password: Yup.string()
        .required("Password is required"),
    rememberMe: Yup.boolean().default(false)
})

const newPassSchema = Yup.object({
    new_password: Yup.string()
        .required("No password set")
        .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .matches(/(?=.*\d)/, "Password must contain at least one number")
        .matches(/(?=.*[@$!%*?&])/, "Password must contain at least one symbol")
        .min(8, "Password must be at least 8 characters long"),
    confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password")], "Both Password must match")
    ,
})

const entryPageSchema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format")
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Invalid email format"
        ),
})

const changePassSchema = Yup.object({
    current_password: Yup.string()
        .required("Old password is required"),
    new_password: Yup.string()
        .required("Password is required")
        .matches(/[!@#$%^&*(),.?":{}|<>]/, "Must contain at least one symbol")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])/, "Must include upper and lower case letters")
        .matches(/^.{8,}$/, "Must be at least 8 characters long"),
    confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("new_password")], "Both Password must match"),
})

const forgetPasswordSchema = Yup.object({
    email: Yup.string()
        .required("Email is required")
        .email("Invalid email format")
        .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/, "Invalid email format"),
})

const otpSchema = Yup.object().shape({
    otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});


const editProfileSchema = Yup.object({
    full_name: Yup.string()
        .required("Full name is required")
        .min(2, "Minimum 2 characters"),

    mobile_no: Yup.string()
        .required("Phone number is required")
        .max(10, "Maximum 10 digits are allowed")
        .matches(/^\S+$/, "Spaces are not allowed"),
})

const now = new Date();
const currentMonth = now.getMonth() + 1; // getMonth is 0-based
const currentYear = now.getFullYear();

const addCardSchema = Yup.object({
    name: Yup.string().required("Name on Card is required"),
    card_number: Yup.string()
        .required("Card Number is required")
        .matches(/^\d{16}$/, "Card Number must be 16 digits"),

    card_month: Yup.string()
        .required("Month is required")
        .matches(/^(0[1-9]|1[0-2])$/, "Invalid month")
        .test("valid-month", "Entered previous month", function (value) {
            const { card_year } = this.parent; // access sibling field
            if (!value || !card_year) return true; // let year handle its own error
            const month = parseInt(value, 10);
            const year = parseInt(card_year, 10);

            if (year < currentYear) return false;
            if (year === currentYear && month < currentMonth) return false;
            return true;
        }),

    card_year: Yup.string()
        .required("Year is required")
        .matches(/^\d{4}$/, "Year must be 4 digits")
        .test("valid-year", "Entered previous year", (value) => {
            if (!value) return false;
            const year = parseInt(value, 10);
            return year >= currentYear && year <= currentYear + 10;
        }),

    card_cvc: Yup.string()
        .required("CVV is required")
        .matches(/^\d{3}$/, "CVV must be 3 digits"),
});

const updateCardSchema = Yup.object({

    name: Yup.string().required("Name on Card is required"),

    card_month: Yup.string()
        .required("Month is required")
        .matches(/^(0[1-9]|1[0-2])$/, "Invalid month")
        .test("valid-month", "Entered previous month", function (value) {
            const { card_year } = this.parent; // access sibling field
            if (!value || !card_year) return true; // let year handle its own error
            const month = parseInt(value, 10);
            const year = parseInt(card_year, 10);

            if (year < currentYear) return false;
            if (year === currentYear && month < currentMonth) return false;
            return true;
        }),

    card_year: Yup.string()
        .required("Year is required")
        .matches(/^\d{4}$/, "Year must be 4 digits")
        .test("valid-year", "Entered previous year", (value) => {
            if (!value) return false;
            const year = parseInt(value, 10);
            return year >= currentYear && year <= currentYear + 10;
        }),

});

const createPassSchema = Yup.object({
    password: Yup.string()
        .required("Password is required")
        .matches(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .matches(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .matches(/(?=.*\d)/, "Password must contain at least one number")
        .matches(/(?=.*[@$!%*?&])/, "Password must contain at least one symbol")
        .min(8, "Password must be at least 8 characters long"),

    confirm_password: Yup.string()
        .required("Confirm Password is required")
        .oneOf([Yup.ref("password")], "Both passwords must match"),
})

const uploadMovieSchema = Yup.object({
    movie_title: Yup.string()
        .required("Movie title is required")
        .max(50, "Maximum 50 characters")
        .min(2, "Minimum 2 characters"),
    movie_description: Yup.string()
        .required("Movie description is required")
        .max(500, "Maximum 500 characters")
        .min(10, "Minimum 10 characters"),
    movie_thumbnail: Yup.mixed()
        .required("Movie thumbnail is required")
    ,
    movie_banner: Yup.mixed()
        .required("Movie banner is required")
    ,
    movie_categories: Yup.array()
        .min(1, "Movie categories are required"),
    movie_trailer_id: Yup.number()
        .required("Movie trailer title is requried"),
    movie_casts: Yup.array()
        .min(1, "Movie casts are required"),
    movie_creators: Yup.array()
        .min(1, "Movie creators are required"),
    movie_tags: Yup.array()
        .min(1, "Movie tags are required"),
})

const uploadTvShowSchema = Yup.object({
    show_title: Yup.string()
        .required("Tv show title is required")
        .max(50, "Maximum 50 characters")
        .min(2, "Minimum 2 characters"),
    show_description: Yup.string()
        .required("Tv show description is required")
        .max(500, "Maximum 500 characters")
        .min(10, "Minimum 10 characters"),
    show_thumbnail: Yup.mixed()
        .required("Tv show thumbnail is required")
    ,
    show_banner: Yup.mixed()
        .required("Tv show banner is required")
    ,
    show_categories: Yup.array()
        .min(1, "Tv show categories are required"),
    show_trailer_id: Yup.number()
        .required("Show trailer is requried"),
    show_casts: Yup.array()
        .min(1, "Tv show casts are required"),
    show_creators: Yup.array()
        .min(1, "Tv show creators are required"),
    show_tags: Yup.array()
        .min(1, "Movie categories are required"),
    // show_trailer_video: Yup.mixed()
    //     .required("Movie trailer is requried")
})

const addGenreSchema = Yup.object({
    name: Yup.string()
        .required("Add genere is required")
        .min(2, "Minimum 2 characters")
})

const uploadEpisodeSchema = Yup.object({
    is_show_multi_season: Yup.boolean()
        .required("Multi season checked is required"),
    show_seasons: Yup.number()
        .min(1)
        .required(),
    episode_details: Yup.array()
        .of(
            Yup.object({
                episode_title: Yup.string()
                    .required("Episode title is required")
                    .min(2, "Minimum 2 characters"),

                episode_description: Yup.string()
                    .required("Episode description is required")
                    .min(10, "Minimum 10 characters"),
                episode_media: Yup.string()
                    .required("Url is required"),
                episode: Yup.string()
                    .required("Episode is required")
            })
        )
        .min(1, "At least one episode is required"),
})

const uploadTrailerSchema = Yup.object({
    trailer_title: Yup.string()
        .trim()
        .required("Trailer title is required"),

    trailer_description: Yup.string()
        .trim()
        .required("Trailer description is required"),

    trailer_category: Yup.string()
        .required("Trailer category is required"),
    trailer_video_url: Yup.string()
        .required("Trailer video is required")
});

export { loginSchema, newPassSchema, entryPageSchema, changePassSchema, forgetPasswordSchema, otpSchema, addCardSchema, editProfileSchema, createPassSchema, updateCardSchema, uploadMovieSchema, uploadTvShowSchema, addGenreSchema, uploadEpisodeSchema, uploadTrailerSchema }