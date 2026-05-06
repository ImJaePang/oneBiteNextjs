"use server";

export async function createReviewAction(formData: FormData) {
    // async function createReviewAction(){
    // console.log("server action called");
    // console.log("formData : ", formData);
    const bookId = formData.get("bookId")?.toString();
    const content = formData.get("content")?.toString();
    const author = formData.get("author")?.toString();
    // console.log(content, author);
    if (!content || !author || !bookId) {
        return;
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
            {
                method: "POST",
                body: JSON.stringify({ bookId, content, author }),
            },
        );
        console.log(response.status);
    } catch (err) {
        console.error(err);
        return;
    }
}
