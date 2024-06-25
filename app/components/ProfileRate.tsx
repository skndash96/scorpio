"use client";
import { useState } from "react";
import { FaRegStar as StarEmptyIcon } from "react-icons/fa";
import { FaStar as StarFullIcon } from "react-icons/fa6";
import { MdReviews as ReviewIcon } from "react-icons/md";

export default function ProfileRate({
    record
}: {
    record: ProfileSchema
}) {
    let [rating, setRating] = useState(0);
    let [review, setReview] = useState("");
    let [open, setOpen] = useState(false);

    return (
        <div>
            <button className="p-2 flex items-center gap-2 bg-fuchsia-200 border-solid border-2 border-transparent hover:border-fuchsia-500/25 bg-opacity-10" onClick={() => setOpen(state => !state)}>
                <ReviewIcon size={24} color="rgb(192,38,211)" />
                Write a Review
            </button>

            <form className={`${open ? "flex" : "hidden"} flex-col gap-4 mt-4 px-2 border-solid border-0 border-l-2 border-fuchsia-500`} onSubmit={e => e.preventDefault()}>
                <h4 className="mt-2 text-md">
                    What do you think?
                </h4>

                <div className="w-fit flex gap-2">
                    {new Array(10).fill(null).map((_, idx) => (
                        <button className="*:fill-yellow-400" key={idx} onClick={() => setRating(idx + 1)}>
                            {idx < rating ? <StarFullIcon size={20} /> : <StarEmptyIcon size={20} />}
                        </button>
                    ))}
                </div>

                <textarea
                    onChange={(e) => setReview(e.target.value)}
                    className="p-2 bg-fuchsia-200 bg-opacity-10 resize-y"
                    placeholder={"A few words about " + record.name}

                />

                <button className="p-2 w-fit bg-fuchsia-800" type="submit">
                    Submit Review
                </button>
            </form>
        </div>
    );
}